<template>
  <div class="bg-ffffff p-24">
    <h3 class="page-title" style="margin-bottom: 8px">固钉</h3>
    <div ref="containerRef" class="affix-container-ref" style="height: calc(100vh - 166px); overflow: scroll">
      <p v-for="item in 10" :key="item" class="m-tb16">content</p>

      <!-- 固钉 - 顶部 -->
      <m-affix :offset-top="0" :target="containerRef">
        <m-alert :show-icon="false">固钉 - 顶部</m-alert>
      </m-affix>

      <p v-for="item in 20" :key="item" class="m-tb16">content</p>

      <!-- 固钉 - 底部 -->
      <m-affix :offset-bottom="0" :target="containerRef">
        <m-alert :show-icon="false">固钉 - 底部</m-alert>
      </m-affix>

      <p v-for="item in 20" :key="item" class="m-tb16">content</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const containerRef = ref();
</script>
