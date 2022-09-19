import Framework from "@/views/_layout/framework.vue";

export default {
  path: "/dict",
  name: "/dict",
  component: Framework,
  sort: 997,
  redirect: "/dict/list",
  meta: {title: "字典管理", icon: "menu-dict"},
  children: [
    {
      path: "list",
      name: "/dict/list",
      component: () => import("@/views/dict/list/index.vue"),
      meta: {title: "字典列表"},
    },
  ],
};
