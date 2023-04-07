type ObjectKeys<T> = T extends ReadonlyArray<any> | string
  ? never
  : T extends object
  ? Array<keyof T>
  : never;

type ObjectEntries<T> = T extends ReadonlyArray<any> | string
  ? never
  : T extends object
  ? Array<[keyof T, T[keyof T]]>
  : never;

type ObjectValues<T> = T extends ReadonlyArray<any> | string
  ? never
  : T extends object
  ? Array<T[keyof T]>
  : never;

export class ObjectUtils {
  public static keyBy<
    T extends Record<string, any>,
    K extends keyof T & string
  >(array: readonly T[], prop: K): Record<T[K], T> {
    const result: Record<string, T> = {};
    array.forEach((a) => (result[a[prop]] = a));
    return result;
  }

  public static typedKeys<T extends object>(o: T): ObjectKeys<T> {
    return Object.keys(o) as ObjectKeys<T>;
  }

  public static typedEntries<T extends object>(o: T): ObjectEntries<T> {
    return Object.entries(o) as ObjectEntries<T>;
  }

  public static typedValues<T extends object>(o: T): ObjectValues<T> {
    return Object.values(o) as ObjectValues<T>;
  }
}
