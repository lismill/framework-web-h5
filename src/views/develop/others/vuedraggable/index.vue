<template>
  <div class="bg-ffffff p-24">
    <h3 class="page-title m-b24">拖拽插件</h3>
    <l-draggable v-bind="config" @update:data="(data) => (config.list = data)">
      <template #default="{element, index}">
        <div class="item">
          {{ index }} -
          <m-input v-model="element.name" style="width: 160px"></m-input>
        </div>
      </template>
    </l-draggable>
    <p class="m-t16">{{ config.list }}</p>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const config = reactive({
  list: [
    {
      name: "111",
      order: 1,
      fixed: true,
    },
    {
      name: "222",
      order: 2,
    },
    {
      name: "333",
      order: 3,
    },
    {
      name: "444",
      order: 4,
    },
    {
      name: "555",
      order: 5,
    },
    {
      name: "666",
      order: 6,
    },
  ],
});
</script>

<style lang="scss" scoped>
.item {
  border: 1px solid #f0f0f0;
  padding: 8px 16px;
}
</style>
