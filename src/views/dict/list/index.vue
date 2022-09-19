<template>
  <div class="dict-list bg-ffffff p-24">
    <l-table ref="table" :config="deepConfig" @operate="handleOperate">
      <template #status="{rows}">
        <l-status-tag
          :type="rows.status === '1' ? 'success' : 'danger'"
          :title="rows.status === '1' ? '启用' : '禁用'"
        />
      </template>
      <template #operate="{rows, index}">
        <l-table-operate
          :list="operateList(rows)"
          @handle:click="(name) => handleOperate(name, rows, index)"
        ></l-table-operate>
      </template>
    </l-table>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {config} from "./config";
import {useCloneDeep} from "@/hooks/useCloneDeep";
import {ILTableOperate} from "@/components/l-table-operate/interface";
import {useMessage} from "@/hooks/useMessage";

const deepConfig = reactive(useCloneDeep(config));
const table = ref();

/**
 * 操作按钮
 */
const operateList = (rows: {status: string}): Array<ILTableOperate> => {
  return [
    {name: "编辑", show: true},
    {name: "启用", show: rows.status === "2", popconfirm: "确定启用么?"},
    {name: "禁用", show: rows.status === "1", popconfirm: "确定禁用么?"},
    {name: "删除", show: true, popconfirm: "确定删除么?"},
  ];
};

/**
 * 操作功能
 */
const handleOperate = (key: string, rows: any, index: number) => {
  switch (key) {
    case "新建字典":
      console.log(rows);
      useMessage().success(`新建字典`);
      break;
    case "编辑":
      console.log(rows);
      useMessage().success(`编辑字典`);
      break;
    case "导出字典":
      console.log(rows);
      useMessage().success(`导出字典`);
      break;
    case "启用":
    case "禁用":
      console.log(rows, index);
      table.value.queryData();
      break;
    default:
      break;
  }
};
</script>
