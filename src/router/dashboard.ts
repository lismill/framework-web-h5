import Framework from "@/views/_layout/framework.vue";

export default {
  path: "/dashboard",
  name: "/dashboard",
  sort: 1,
  redirect: "/dashboard/index",
  component: Framework,
  meta: {
    title: "控制台",
    icon: "menu-dashboard",
  },
  children: [
    {
      path: "index",
      name: "/dashboard/index",
      component: () => import(/* webpackChunkName: "dashboard" */ "@/views/dashboard/index/index.vue"),
      meta: {
        title: "控制台",
        icon: "menu-dashboard",
      },
    },
  ],
};
