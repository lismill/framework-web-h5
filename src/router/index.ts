import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

// 自动导入当前目录下的路由配置
const modules = import.meta.globEager("./*.ts");
const ROUTES = Object.values(modules)
  .map((routes: any) => routes.default)
  .sort((a, b) => a.sort - b.sort);

// 路由记录，这个跟vue2中用法一致，就不做过多解释了
const routes: Array<RouteRecordRaw> = [
  /**
   * 自动导入路由配置
   */
  ...ROUTES,
  /**
   * base
   */
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  /**
   * 404 页面
   */
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import(/* webpackChunkName: "not-found" */ "@/views/_not-found/index.vue"),
    meta: {
      hidden: true,
    },
  },
];

const router = createRouter({
  /**
   * 路由模式
   * createWebHashHistory || createWebHistory
   */
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    const CONTENT = document.querySelector("#framework-content-scrollbar");
    CONTENT?.scrollTo(0, 0);
  },
});

router.beforeEach((to, from, next) => {
  to.meta.title
    ? (document.title = `${import.meta.env.VITE_NAME} | ${to.meta.title}`)
    : (document.title = `${import.meta.env.VITE_NAME}`);
  next();
});

export default router;
