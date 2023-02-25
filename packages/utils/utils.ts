export const isCtrl = (
  event: React.KeyboardEvent | React.MouseEvent | MouseEvent
) => {
  return event.ctrlKey || event.metaKey;
};

export const isCtrlEnter = (event: React.KeyboardEvent<HTMLElement>) => {
  return isCtrl(event) && event.key === "Enter";
};

export function isValidURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}
