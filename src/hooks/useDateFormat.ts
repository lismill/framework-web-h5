import dayjs from "dayjs";

export const useDateFormat = (value: string | Array<string>, formats = "YYYY-MM-DD 00:00:00") => {
  if (typeof value === "string") {
    return dayjs(value).format(formats);
  }
  if (value.length === 1) {
    return [dayjs(value[0]).format(formats)];
  }
  if (value.length === 2) {
    return [dayjs(value[0]).format("YYYY-MM-DD 00:00:00"), dayjs(value[1]).format("YYYY-MM-DD 23:59:59")];
  }
  return value;
};
