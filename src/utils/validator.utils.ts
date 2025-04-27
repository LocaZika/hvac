export const isEmptyObject = <T>(object: T | any): boolean | null | undefined => {
  return object && Object.keys(object).length === 0 && object.constructor === Object;
};

export const isEmptyArray = (values: Array<any>) => {
  return values && Array.isArray(values) && values.length === 0;
};

type TArrayItemType = {
  key: string;
  type: 'string' | 'number' | 'boolean';
  required?: boolean;
};
export type TArrayItemsType = TArrayItemType[];
/**
 * Checks array items type
 * @param items Set array to test.
 * @param types Set type of item in array.
 * @returns {boolean} true if array items type is exactly. Otherwise false.
 */
export function isValidTypesArray(items: any[], types: TArrayItemsType): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;

  return items.every(item => {
    // Check for extra keys
    const extraKeys = Object.keys(item).filter(key => !types.some(type => type.key === key));
    if (extraKeys.length > 0) return false;

    return types.every(type => {
      if (type.required === false && !(type.key in item)) {
        return true;
      }
      return typeof item[type.key] === type.type;
    });
  });
}
export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
};