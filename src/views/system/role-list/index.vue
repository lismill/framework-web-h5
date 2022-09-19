<template>
  <div class="bg-ffffff p-24">
    <l-table :config="deepConfig" @operate="operateHandler">
      <template #information="{rows}">
        <div class="info">
          <div class="info_image">
            <l-popover-image :config="{popover: {src: rows.image, style: {width: 500}}}">
              <template #custom-trigger><img :src="rows.image" /></template>
            </l-popover-image>
          </div>
          <div class="info_text">{{ rows.text }}</div>
        </div>
      </template>
      <template #operate="{rows}">
        <l-table-operate
          :list="[
            {name: '启用', show: true, popconfirm: '确定启用么?'},
            {name: '禁用', show: true, popconfirm: '确定禁用么?'},
            {name: '删除', show: true, popconfirm: '确定删除么?'},
            {name: '查看', show: true},
            {name: '编辑', show: true},
            {name: '注销', show: true},
          ]"
          @handle:click="(name) => operateHandler(name, rows)"
        ></l-table-operate>
      </template>
    </l-table>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {tableConfig} from "./config";

const deepConfig = reactive(tableConfig);
const ROUTER = useRouter();
const operateHandler = (name: string, rows: any) => {
  console.log(name, rows);
  name === "新建角色" && ROUTER.push("/system/role-create");
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  align-items: center;
  .info_image {
    width: 75px;
    height: 40px;
    border-radius: 2px;
    margin-right: 10px;
    img {
      width: 75px;
      height: 40px;
      border-radius: 2px;
    }
  }
}
</style>
