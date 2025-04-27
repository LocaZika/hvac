import { typeOf } from "./typeOf.utils";

/**
 * Remove properties from object. If properties is undefined, it will be removed all properties.
 * @param object source object.
 * @param properties properties to remove.
 * @returns Removed properties object.
 */
export function removeProperty<T>(object: T, properties?: string[]): T {
  if (typeOf(object) !== 'object') {
    throw new Error('Property must be an object');
  }
  const obj = { ...object };
  if (properties && Array.isArray(properties)) {
    properties.forEach((key) => delete obj[key as keyof T]);
    console.log('>>object after remove props: ', obj);
  } else {
    const objKeys: string[] = Object.keys(obj ?? {});
    objKeys.forEach((key) => delete obj[key as keyof T]);
  }
  return obj;
};

/**
 * Remove empty properties object
 * @param object source object.
 * @returns Removed empty properties object.
 */
export function removePropertyEmptyValue<T>(object: T): T {
  if (typeOf(object) !== 'object') {
    throw new Error('Property must be an object');
  }
  const obj = {...object };
  const objKeys = Object.keys(obj ?? {});
  objKeys.forEach((key: string) => {
    if (obj[key as keyof T] === null || obj[key as keyof T] === undefined || obj[key as keyof T] === '') {
      delete obj[key as keyof T];
    }
  });
  return obj;
}