<template>
  <div class="bg-ffffff p-24">
    <h3 class="page-title m-b24">权限设置（树）</h3>
    <m-tree
      v-model:checked-keys="checkedKeys"
      size="large"
      :checkable="true"
      :field-names="{
        key: 'permission',
        title: 'name',
      }"
      :block-node="true"
      :data="treeData"
    />
    <div class="m-t16">{{ checkedKeys }}</div>
  </div>
</template>
<script setup lang="ts">
const checkedKeys = ref<Array<string | number>>([]);

setTimeout(() => {
  checkedKeys.value = ["100001", "200021"];
}, 600);

const treeData = [
  {
    name: "系统设置",
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
    permission: "200000",
    children: [
      {
        name: "表格组件",
        permission: "200010",
        children: [
          {
            name: "基础表格",
            permission: "200011",
          },
          {
            name: "选择表格",
            permission: "200012",
          },
          {
            name: "编辑表格",
            permission: "200013",
          },
        ],
      },
      {
        name: "表单组件",
        permission: "200020",
        children: [
          {
            name: "基础表单",
            permission: "200021",
          },
          {
            name: "弹出表单",
            permission: "200022",
          },
        ],
      },
      {
        name: "其他组件",
        permission: "200003",
      },
    ],
  },
];
</script>
