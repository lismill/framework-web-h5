<template>
  <div class="bg-ffffff p-24">
    <l-table-choose
      :modal-config="deepModalConfig"
      :choose-config="deepChooseConfig"
      @choose:change="chooseChange"
    ></l-table-choose>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useCloneDeep} from "@/hooks/useCloneDeep";
import {modalConfig, chooseConfig} from "./config";

const deepModalConfig = reactive(useCloneDeep(modalConfig));
const deepChooseConfig = reactive(useCloneDeep(chooseConfig));

/**
 * 默认选择项
 */
const CHOOSE_DATAS = [
  {
    city: "湖北省-牡丹江市-珠山区",
    date: "1989-11-06",
    guid: "fF1D6DcC-4AE6-A222-2EC1-BeD5f541956b",
    id: 0,
    disabled: true,
    name: "Shirley Garcia - 还提供了一个全局配置方法，在调用前提前配置，全局一次生效。还提供了一个全局配置方法，在调用前提前配置，全局一次生效。",
  },
];
deepChooseConfig.table.data = CHOOSE_DATAS;
deepModalConfig.table.selectedRows = CHOOSE_DATAS;

/**
 * 切换选择项
 * @param data
 */
const chooseChange = (data: any) => {
  console.log("choose:change:::", data);
};
</script>

<style lang="scss" scoped></style>
