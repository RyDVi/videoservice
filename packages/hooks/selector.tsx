import React, { createContext } from 'react';
import { useArray } from './array';

export interface SelectionResult<Data, Value = any> {
  select: (data: Data | Data[]) => void;
  unselect: (data: Data | Data[]) => void;
  change: (data: Data | Data[], selected: boolean) => void;
  isSelected: (data: Data | Data[]) => boolean;
  selected: Value[];
  clear: () => void;
}

type GetSelectedCallback<Data, Value = any> = (data: Data) => Value;

export function useSelector<Data, Value = any>(
  /**
   * Specifies how the selection value will be retrieved
   */
  getSelectionValue: GetSelectedCallback<Data, Value>,
  /**
   * Initial selected values
   */
  selected?: Value[],
  /**
   * If defined initial selected values then may be changed their selection state
   */
  onChange?: (selected: Value[]) => void
): SelectionResult<Data, Value> {
  const { items, addIfNotExist, removeByIndex, pushMany, setItems, clear } =
    useArray<Value>(selected || [], onChange);
  const select = React.useCallback(
    (data: Data | Data[]) => {
      if (Array.isArray(data)) {
        return pushMany(data.map((d) => getSelectionValue(d)));
      }
      return addIfNotExist(getSelectionValue(data));
    },
    [addIfNotExist, getSelectionValue, pushMany]
  );
  const unselect = React.useCallback(
    (data: Data | Data[]) => {
      if (Array.isArray(data)) {
        const itemsForUnselect = data.map((d) => getSelectionValue(d));
        const itemsForSelect = items.filter((item) => !itemsForUnselect.includes(item));
        setItems(itemsForSelect);
        return;
      }
      const itemIndex = items.indexOf(getSelectionValue(data));
      if (itemIndex !== -1) {
        removeByIndex(itemIndex);
      }
    },
    [getSelectionValue, items, removeByIndex, setItems]
  );
  const isSelected = React.useCallback(
    (data: Data | Data[]) => {
      if (Array.isArray(data)) {
        if (!data.length) {
          return false;
        }
        return data.every((d) => items.includes(getSelectionValue(d)));
      }
      return items.includes(getSelectionValue(data));
    },
    [getSelectionValue, items]
  );
  const change = React.useCallback(
    (data: Data | Data[], isSelect: boolean) => {
      if (isSelect) {
        select(data);
        return;
      }
      unselect(data);
    },
    [select, unselect]
  );
  return { selected: items, unselect, clear, select, isSelected, change };
}

export const SelectorContext = createContext<SelectionResult<any, any>>({
  change: () => null,
  clear: () => null,
  isSelected: () => false,
  select: () => null,
  selected: [],
  unselect: () => null,
});

export function SelectorProvider<Data, Value = any>(props: {
  children: React.ReactNode;
  isSelectedCallback: GetSelectedCallback<Data, Value>;
}) {
  const { children, isSelectedCallback } = props;
  const selector = useSelector<Data, Value>(isSelectedCallback);
  return <SelectorContext.Provider value={selector}>{children}</SelectorContext.Provider>;
}

export function useSelectorContext<Data, Value = any>(): SelectionResult<Data, Value> {
  const selectionContext = React.useContext(SelectorContext);
  if (selectionContext === undefined) {
    throw new Error('SelectionContext is not provided.');
  }
  return selectionContext;
}
