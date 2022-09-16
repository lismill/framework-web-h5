import {AxiosPromise} from "axios";
import request from "@/packages/axios";

import {IHomeListP, IHomeListR} from "./interface";

// 获取首页配置
export const getHomeList = (params: IHomeListP): AxiosPromise<IHomeListR> => {
  return request.get("url", {params});
};

// 设置首页配置
export const setHomeList = (params: IHomeListP): AxiosPromise<IHomeListR> => {
  return request.post("/home/config", params);
};
