import qs from "qs";

export default function getUrlkey(key: string) {
  const obj = qs.parse(window.location.search, {ignoreQueryPrefix: true});
  if (obj === undefined) {
    return "";
  }
  const v = obj[key];
  if (!v) {
    return "";
  }
  if (typeof v === "string") {
    return v;
  }
  return JSON.stringify(v);
}
