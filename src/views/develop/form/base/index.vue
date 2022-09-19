<template>
  <div class="bg-ffffff">
    <l-form :config="deepConfig" @submit="submit" @operate="handleOperate">
      <template #slotName="{item}">
        <m-input
          v-model="deepConfig.form.data[item.name]"
          :disabled="deepConfig.form.disabled"
          placeholder="请输入自定义插槽"
        ></m-input>
      </template>
    </l-form>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useCloneDeep} from "@/hooks/useCloneDeep";
import {config} from "./config";

const deepConfig = reactive(useCloneDeep(config));

/**
 * 设置默认值
 */
deepConfig.form.data = {
  text: "展示文本信息，支持 <b style='color: #ff4d4f;'>HTML</b>",
  editor: "<div>Hello,</div>",
  switch: false,
  radio: "",
  checkbox: [],
  upload: [
    {
      name: "lean.png",
      url: "https://i.postimg.cc/8kq8ZyL2/lean.png",
      response: {
        status: "done",
      },
    },
  ],
};

/**
 * 提交表单成功
 */
const submit = () => {
  console.log(deepConfig.form.data);
};

/**
 * 操作按钮
 */
const handleOperate = (name: string) => {
  console.log(name, deepConfig.form.data);
  name === "禁用表单" && (deepConfig.form.disabled = true);
  name === "启用表单" && (deepConfig.form.disabled = false);
};
</script>
