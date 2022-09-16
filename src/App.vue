<template>
  <div v-if="loading" id="frameword-loading">
    <div>加载中...</div>
  </div>
  <router-view v-else></router-view>
</template>
<script setup lang="ts">
const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 300);
</script>
