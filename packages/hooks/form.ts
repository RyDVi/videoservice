import React from "react";

export type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export const handleInputChange = (event: InputChangeEvent) => {
  const target = event.target;
  const value =
    target.type === "checkbox"
      ? (target as HTMLInputElement).checked
      : target.value;
  return { [target.name]: value };
};

function useHandleChange<State>(
  setState: React.Dispatch<React.SetStateAction<State>>
): React.FormEventHandler<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
function useHandleChange<State>(
  setState: (state: State) => void,
  state: State
): React.FormEventHandler<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
function useHandleChange<State>(
  setState: any,
  state?: State
): React.FormEventHandler<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> {
  return React.useCallback(
    (event: InputChangeEvent) => {
      if (state) {
        return setState({ ...state, ...handleInputChange(event) });
      }
      return setState((state: State) => ({
        ...state,
        ...handleInputChange(event),
      }));
    },
    [state, setState]
  );
}

export { useHandleChange };
