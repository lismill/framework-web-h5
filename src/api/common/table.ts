import request from "@/packages/axios";

export function getTableList(params: any) {
  return request({
    url: "/api/getTableList",
    method: "get",
    params,
  });
}
export function getDictList(params: any) {
  return request({
    url: "/api/getDictList",
    method: "get",
    params,
  });
}
export function getSearchRemoteList() {
  return request({
    url: "/api/getSearchRemoteList",
    method: "get",
  });
}
