export const isCtrl = (
  event: React.KeyboardEvent | React.MouseEvent | MouseEvent
) => {
  return event.ctrlKey || event.metaKey;
};

export const isCtrlEnter = (event: React.KeyboardEvent<HTMLElement>) => {
  return isCtrl(event) && event.key === "Enter";
};

export function isValidURL(str: string) {
  var res = str.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}
