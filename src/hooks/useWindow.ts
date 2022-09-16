import {RouteLocationRaw} from "vue-router";
import Vrouter from "@/router";

/**
 * 打开新窗口
 * @param path
 * @returns
 */
const open = (path: string) => window.open(`${window.origin}${path}`, "_blank");

/**
 * 跳转路由
 * @param params
 */
const jump = (params: string | RouteLocationRaw) => Vrouter.push(params);

/**
 * 刷新父窗口
 * @returns
 */
const reloadParentWindow = () => window.opener.location.reload();

export {open, jump, reloadParentWindow};
