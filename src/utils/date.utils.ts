const date = new Date();
const month = new Map<number, string>([
  [0, "january"],
  [1, "february"],
  [2, "march"],
  [3, "april"],
  [4, "may"],
  [5, "june"],
  [6, "july"],
  [7, "august"],
  [8, "september"],
  [9, "october"],
  [10, "november"],
  [11, "december"],
]);
const dayOfWeek = new Map<number, string>([
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
]);
const padZero = (num: number): string => num.toString().padStart(2, "0");
const getDay = (): string => padZero(date.getDate());
const getMonth = (): string => padZero(date.getMonth() + 1);
type TOption = "day" | "month" | "year" | "fullDate" | "dayOfWeek";
export function getCurrentDate(option: TOption): string | undefined {
  if (option) {
    switch (option) {
      case "day":
        return date.getDate().toString();
      case "month":
        return month.get(date.getMonth());
      case "year":
        return date.getFullYear().toString();
      case "fullDate":
        return `${getDay()}/${getMonth()}/${date.getFullYear()}`;
      case "dayOfWeek":
        return dayOfWeek.get(date.getDay());
      default:
        throw new Error("the option is invalid");
    }
  }
  return date.toString();
}

type TFormatOptions = "dd/MM/yyyy HH:mm";
export function formatDate(date: string | Date, format: TFormatOptions) {
  switch (format) {
    case "dd/MM/yyyy HH:mm": {
      const dateClass = new Date(date);
      const pad = (n: number) => n.toString().padStart(2, "0");
      const day = pad(dateClass.getDate());
      const month = pad(dateClass.getMonth() + 1);
      const year = dateClass.getFullYear();
      const hours = pad(dateClass.getHours());
      const minutes = pad(dateClass.getMinutes());
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    default:
      throw new Error("Invalid format");
  }
}
