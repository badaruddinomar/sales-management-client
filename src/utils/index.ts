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
