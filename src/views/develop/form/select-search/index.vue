<template>
  <div class="dashboard bg-ffffff p-24">
    <h3 class="page-title m-b24">下拉搜索</h3>
    <div style="width: 320px">
      <l-form-select-search
        placeholder="请输入关键词"
        :request="request"
        :field-names="{label: 'key', value: 'value'}"
        :default-value="defaultValue"
        :options="options"
        @change="change"
      ></l-form-select-search>
    </div>

    <div class="m-t16">{{ current }}</div>
  </div>
</template>
<script setup lang="ts">
import {getSearchRemoteList} from "@/api/common/table";

const current = ref<string | number>("shenzhen");
const change = (v: string | number) => (current.value = v);

// 远程搜索地址
const request = getSearchRemoteList;

// 默认的选项数组
const options = [
  {key: "北京", value: "beijing"},
  {key: "上海", value: "shanghai"},
];

// 默认展示的值，多用于编辑场景
const defaultValue = {key: "深圳", value: "shenzhen"};
</script>
