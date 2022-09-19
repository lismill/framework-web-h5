<template>
  <div class="bg-ffffff p-24">
    <h3 class="page-title m-b24">权限设置（卡片）</h3>
    <div class="l-permission" style="display: flex">
      <div v-for="(menu, index) in menus" :key="menu.name" class="m-r16">
        <l-permission-card :config="menu" :index="index" @change="change"></l-permission-card>
      </div>
    </div>
    <div class="m-t16 m-b32">{{ checkeds }}</div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import flatten from "lodash/flatten";
import {ILPermissionCard} from "@/components/l-permission-card/interface";

const change = (data: any, index: number) => (menus.value[index].checked = data);
const checkeds = computed(() => flatten(menus.value.map((item: any) => item.checked)));

const menus = ref<Array<ILPermissionCard>>([
  {
    name: "系统设置",
    icon: "https://i.postimg.cc/8kq8ZyL2/lean.png",
    checked: [],
    permission: "100000",
    children: [
      {
        name: "账号管理",
        permission: "100001",
      },
      {
        name: "角色管理",
        permission: "100002",
      },
      {
        name: "权限配置",
        permission: "100003",
      },
    ],
  },
  {
    name: "开发工具",
    icon: "",
    checked: [],
    permission: "200000",
    children: [
      {
        name: "基础表格",
        permission: "200001",
      },
      {
        name: "基础表单",
        permission: "200002",
      },
      {
        name: "其他组件",
        permission: "200003",
      },
      {
        name: "基础表格",
        permission: "200001",
      },
      {
        name: "基础表单",
        permission: "200002",
      },
      {
        name: "其他组件",
        permission: "200003",
      },
      {
        name: "基础表格",
        permission: "200001",
      },
      {
        name: "基础表单",
        permission: "200002",
      },
      {
        name: "其他组件",
        permission: "200003",
      },
      {
        name: "基础表格",
        permission: "200001",
      },
      {
        name: "基础表单",
        permission: "200002",
      },
      {
        name: "其他组件",
        permission: "200003",
      },
    ],
  },
]);
</script>
