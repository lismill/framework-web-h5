<template>
  <div class="bg-ffffff p-24">
    <m-button type="primary" @click="deepConfig.dialog.visible = true">弹出表单</m-button>
    <div class="m-t16">{{ deepConfig.form.data }}</div>
    <l-form-dialog
      :config="deepConfig"
      :default-form-data="useCloneDeep(config.form.data)"
      @submit="submit"
      @operate="handleOperate"
    >
      <!-- 自定义插槽 -->
      <template #slotName="{item}">
        <m-input
          v-model="deepConfig.form.data[item.name]"
          :disabled="deepConfig.form.disabled"
          placeholder="请输入自定义插槽"
        ></m-input>
      </template>
    </l-form-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useCloneDeep} from "@/hooks/useCloneDeep";
import {config} from "./config";

const deepConfig = reactive(useCloneDeep(config));

/**
 * 提交表单成功
 */
const submit = () => {
  console.log("submit:::", deepConfig.form.data);
};

/**
 * 操作按钮
 */
const handleOperate = (name: string) => {
  console.log(name, deepConfig.form.data);
};
</script>
