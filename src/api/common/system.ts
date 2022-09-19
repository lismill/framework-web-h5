import request from "@/packages/axios";

export function getAccountList(params: any) {
  return request({
    url: "/account/list",
    method: "get",
    params,
  });
}

export const getInformation = (params: any) => {
  return request({
    url: "/information/list",
    method: "get",
    params,
  });
};
