import dayjs from "dayjs";
// 格式化时间
export const DateFormat = (value: number, formats = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(value * 1000).format(formats);
};
