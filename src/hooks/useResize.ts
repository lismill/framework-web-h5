const clearObject = (obj: any) => {
  const keyList = Object.keys(obj);
  keyList.forEach((item) => {
    Reflect.deleteProperty(obj, item);
  });
};
export {clearObject};
