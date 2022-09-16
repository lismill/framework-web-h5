import dayjs from "dayjs";

export const useDateFormat = (value: string, formats = "YYYY-MM-DD 00:00:00") => dayjs(value).format(formats);
