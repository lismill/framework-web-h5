import request from "@/packages/axios";

/**
 * 获取省市区地址
 */
export function getAreaList() {
  return request({
    url: "/file/agent-config/prod/agent_region.json",
    withCredentials: false,
    timeout: 0,
  });
}

/**
 * 上传图片
 * @param file
 * @returns
 */
export function uploadImage(file: HTMLFormElement) {
  const data = new FormData();
  data.append("image", file.file);
  data.append("type", "folder");
  return request({
    url: "baseapi/platform/file/uploadImage",
    method: "POST",
    headers: {"Content-Type": "multipart/form-data"},
    data,
  });
}

/**
 * 获取腾讯云cos密钥
 * @param params
 * @returns
 */
export const getEhemeralKey = (params: any) => {
  return request({
    method: "get",
    url: "/xxxxxx",
    params,
  });
};
