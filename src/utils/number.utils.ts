export const toTel = (value: string): string => {
  const regex = /[(\D)(\s)]/g;
  return "+" + value.replace(regex, "");
};
export const toCurrency = (value: number): string => {
  return Intl.NumberFormat(
    'en-EN',
    {
      style: 'currency',
      currency: 'usd',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  ).format(value);
};