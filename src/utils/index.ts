import numbro from "numbro";

export const checkNumber = (number: number) => {
  if (number > 0) {
    return "positive";
  } else if (number < 0) {
    return "negative";
  } else {
    return "zero";
  }
};
export const formatedNumber = (number: number) => {
  return numbro(number).format({ thousandSeparated: true });
};
import { format, parseISO } from "date-fns";

export function formatDate(isoDateString: string) {
  if (isoDateString) {
    const parsedDate = parseISO(isoDateString);
    return format(parsedDate, "dd-MM-yyyy");
  } else {
    return null;
  }
}
