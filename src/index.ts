import { numberToPersianWords } from "./persianNumberToWords";
import { toJalaali } from "jalaali-js";
interface DateConfig {
  date: Date;
  day: boolean;
  month: boolean;
  year: boolean;
  write: {
    month: boolean;
    day: boolean;
    year: boolean;
  };
  faChar: {
    day: boolean;
    month: boolean;
    year: boolean;
  };
  split: string;
}

export function convertToJalali(date: Date): {
  year: number;
  month: number;
  day: number;
} {
  const { jy, jm, jd } = toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return { year: jy, month: jm, day: jd };
}

export function monthToPersian(month: number): string {
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  return persianMonths[month - 1];
}

export function convertNumberToPersian(num: number): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num
    .toString()
    .split("")
    .map((char) => persianNumbers[parseInt(char)] || char)
    .join("");
}

export function covertDate(config: DateConfig): string {
  const { year, month, day } = convertToJalali(config.date);
  let result = [];

  if (config.year) {
    const yearString = config.faChar.year
      ? convertNumberToPersian(year)
      : year.toString();
    result.push(config.write.year ? numberToPersianWords(year) : yearString);
  }
  if (config.month) {
    const monthString = config.faChar.month
      ? monthToPersian(month)
      : convertNumberToPersian(month);
    result.push(config.write.month ? numberToPersianWords(month) : monthString);
  }
  if (config.day) {
    const dayString = config.faChar.day
      ? convertNumberToPersian(day)
      : day.toString();
    result.push(config.write.day ? numberToPersianWords(day) : dayString);
  }

  return result.join(config.split);
}
// نمونه استفاده
export const config: DateConfig = {
  date: new Date(),
  day: true,
  month: true,
  year: true,
  write: {
    month: true,
    day: true,
    year: true,
  },
  faChar: {
    day: true,
    month: false,
    year: false,
  },
  split: "/",
};

console.log(covertDate(config)); // نتیجه بستگی به تاریخ فعلی دارد
