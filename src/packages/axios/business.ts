const config = {
  /**
   * 拦截请求处理相应的业务逻辑
   * @param request
   * @returns request
   */
  request(request: {method: string; headers: {[x: string]: string}}) {
    console.log("请求拦截器处理业务逻辑", request);

    /**
     * 处理 POST 请求参数
     */
    if (request.method.toUpperCase() === "POST") {
      request.headers["Content-Type"] = "application/json;charset=utf-8";
    }
    return request;
  },

  /**
   * 拦截响应处理相应的业务逻辑
   * @param response
   * @returns response
   */
  response(response: {data: any}) {
    console.log("返回拦截器处理业务逻辑", response);
    return response.data;
  },
};

export default config;
