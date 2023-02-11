import React from 'react';

export const isCtrl = (event: React.KeyboardEvent | React.MouseEvent | MouseEvent) => {
  return event.ctrlKey || event.metaKey;
};

export const isCtrlEnter = (event: React.KeyboardEvent<HTMLElement>) => {
  return isCtrl(event) && event.key === 'Enter';
};
