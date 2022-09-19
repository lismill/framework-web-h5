import {AxiosRequestConfig, AxiosResponse} from "axios";
import qs from "qs";
import {removePending} from "./index";

const config = {
  /**
   * 拦截请求处理相应的业务逻辑
   * @param request
   * @returns request
   */
  request(request: AxiosRequestConfig) {
    /**
     * 处理 POST 请求参数
     */
    this.setupPostParams(request);

    /**
     * 处理特殊参数
     */
    this.setupSpecialParams(request);

    return request;
  },

  /**
   * 拦截响应处理相应的业务逻辑
   * @param response
   * @returns response
   */
  response(response: AxiosRequestConfig) {
    return response.data;
  },

  /**
   * HTTP 请求异常
   */
  error(response: AxiosResponse) {
    console.log(response);
  },
  setupPostParams(request: AxiosRequestConfig) {
    if (request.method?.toUpperCase() === "POST") {
      request.headers = {
        ...request.headers,
        "Content-Type": "application/json;charset=utf-8",
      };
    }
  },
  setupSpecialParams(request: AxiosRequestConfig) {
    if (request.params?.extends) {
      // 打开新窗口访问 get 请求
      if (request.method?.toUpperCase() === "GET" && request.params.extends?.target === "_blank") {
        delete request.params.extends;
        window.open(`${request.url}?${qs.stringify(request.params)}`);
        removePending(request);
      }
      delete request.params.extends;
    }
    if (request.data?.extends) {
      // 打开新窗口访问 get 请求
      if (request.method?.toUpperCase() === "POST" && request.data.extends?.contentType) {
        request.headers = {
          ...request.headers,
          "Content-Type": request.data.extends?.contentType,
        };
      }
      delete request.data.extends;
    }
  },
};

export default config;
