import Framework from "@/views/_layout/framework.vue";
import Layout from "@/views/_layout/index.vue";

export default {
  path: "/develop",
  name: "/develop",
  sort: 999,
  redirect: "/develop/table",
  meta: {
    title: "开发者工具",
    icon: "menu-develop",
  },
  component: Framework,
  children: [
    {
      path: "table",
      name: "/develop/table",
      redirect: "/develop/table/base",
      component: Layout,
      meta: {
        title: "表格组件",
        // icon: "menu-develop-table",
      },
      children: [
        {
          path: "base",
          name: "/develop/table/base",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/table/base/index.vue"),
          meta: {
            title: "基础表格",
          },
        },
        {
          path: "choose",
          name: "/develop/table/choose",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/table/choose/index.vue"),
          meta: {
            title: "选择表格",
          },
        },
        {
          path: "edit",
          name: "/develop/table/edit",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/table/edit/index.vue"),
          meta: {
            title: "编辑表格",
          },
        },
      ],
    },
    {
      path: "form",
      name: "/develop/form",
      redirect: "/develop/form/base",
      component: Layout,
      meta: {
        title: "表单组件",
        // icon: "menu-develop-form",
      },
      children: [
        {
          path: "base",
          name: "/develop/form/base",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/form/base/index.vue"),
          meta: {
            title: "基础表单",
            menuHeader: true,
          },
        },
        {
          path: "dialog",
          name: "/develop/form/dialog",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/form/dialog/index.vue"),
          meta: {
            title: "弹出表单",
            menuHeader: true,
          },
        },
        {
          path: "select-search",
          name: "/develop/form/select-search",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/form/select-search/index.vue"),
          meta: {
            title: "下拉搜素",
            menuHeader: true,
          },
        },
      ],
    },
    {
      path: "others",
      name: "/develop/others",
      redirect: "/develop/others/jsx",
      meta: {
        title: "其他组件",
      },
      component: Layout,
      children: [
        {
          path: "affix",
          name: "/develop/others/affix",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/affix/index.vue"),
          meta: {
            title: "固钉",
          },
        },
        {
          path: "count-to",
          name: "/develop/others/count-to",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/count-to/index.vue"),
          meta: {
            title: "数值滚动",
          },
        },
        {
          path: "vuedraggable",
          name: "/develop/others/vuedraggable",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/vuedraggable/index.vue"),
          meta: {
            title: "拖拽插件",
          },
        },
        {
          path: "qrcode",
          name: "/develop/others/qrcode",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/qrcode/index.vue"),
          meta: {
            title: "二维码",
          },
        },
        {
          path: "popover-image",
          name: "/develop/others/popover-image",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/popover-image/index.vue"),
          meta: {
            title: "气泡图片",
          },
        },
        {
          path: "upload-file",
          name: "/develop/others/upload-file",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/upload-file/index.vue"),
          meta: {
            title: "上传文件",
          },
        },
        {
          path: "permission-tree",
          name: "/develop/others/permission-tree",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/permission-tree/index.vue"),
          meta: {
            title: "权限设置（树）",
          },
        },
        {
          path: "permission-card",
          name: "/develop/others/permission-card",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/permission-card/index.vue"),
          meta: {
            title: "权限设置（卡片）",
          },
        },
        {
          path: "editor",
          name: "/develop/others/editor",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/editor/index.vue"),
          meta: {
            title: "富文本编辑器",
          },
        },
        {
          path: "iframe",
          name: "/develop/others/iframe",
          component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/others/iframe/index.vue"),
          meta: {
            title: "引用外部IFrame",
          },
        },
      ],
    },
    {
      path: "echarts",
      name: "/develop/echarts",
      component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/echarts/index.vue"),
      meta: {
        title: "ECharts",
      },
    },
    {
      path: "amap",
      name: "/develop/amap",
      component: () => import(/* webpackChunkName: "develop" */ "@/views/develop/amap/index.vue"),
      meta: {
        title: "高德地图",
      },
    },
  ],
};
