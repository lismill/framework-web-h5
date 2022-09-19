<template>
  <div class="bg-ffffff p-24">
    <l-table :config="deepConfig" @operate="operateHandler">
      <template #user="{rows}">
        <div class="user_info flex">
          <div class="user_photo">
            <l-popover-image :config="{popover: {src: rows.image, style: {width: 300}}}">
              <template #custom-trigger><img :src="rows.image" /></template>
            </l-popover-image>
          </div>
          <div class="user_message">{{ rows.nick_name }}</div>
        </div>
      </template>
      <template #operate="{rows}">
        <l-table-operate
          :list="[
            {name: '查看', show: true},
            {name: '禁用', show: true, popconfirm: '确定禁用么?'},
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
  name === "查看" && ROUTER.push("/system/account-detail");
  name === "新建用户" && ROUTER.push("/system/account-create");
};
</script>

<style lang="scss" scoped>
.user_info {
  .user_photo {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
