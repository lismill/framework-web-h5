import Framework from "@/views/_layout/framework.vue";

export default {
  path: "/system",
  name: "/system",
  component: Framework,
  sort: 998,
  redirect: "/system/account",
  meta: {title: "系统设置", icon: "menu-system"},
  children: [
    {
      path: "account-list",
      name: "/system/account-list",
      component: () => import("@/views/system/account-list/index.vue"),
      meta: {title: "用户列表"},
    },
    {
      path: "account-create",
      name: "/system/account-create",
      component: () => import("@/views/develop/form/base/index.vue"),
      meta: {
        title: "新建用户",
        hidden: true,
        active: "/system/account-list",
      },
    },
    {
      path: "role-list",
      name: "/system/role-list",
      component: () => import("@/views/system/role-list/index.vue"),
      meta: {title: "角色管理"},
    },
    {
      path: "role-create",
      name: "/system/role-create",
      component: () => import("@/views/develop/form/dialog/index.vue"),
      meta: {
        title: "新建角色",
        hidden: true,
        active: "/system/role-list",
      },
    },
  ],
};
