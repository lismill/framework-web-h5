/*
 ** 判断数据类型, 返回值为 Object  Array  Number String
 */
export const dataType = (value: any): string => {
  const result = Object.prototype.toString.call(value);
  return result.replace(/[^a-zA-Z]/g, " ").split(" ")[2];
};
