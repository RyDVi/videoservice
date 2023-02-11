export class ArrayUtils {
  public static range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => i + from);
  public static removeByIndex = (array: any[], index: number) => [
    ...array.slice(0, index),
    ...array.slice(index + 1),
  ];
}
