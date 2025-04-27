export const spaceToDash = (text: string): string => text.replace(' ', '-');
export const getNumberFromString = (text: string): string => text.match(/\d/g)?.[0] ?? text;

type TTransformOptions = 'capitalize' | 'uppercase' | 'lowercase' | 'capitalizeFirstLetter';
export const transformString = (text: string, transformOption: TTransformOptions) => {
  switch (transformOption) {
    case 'capitalize':
      return text.charAt(0).toUpperCase() + text.slice(1);
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalizeFirstLetter':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
}