<template>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component" :key="$route.name" />
    </keep-alive>
  </router-view>
</template>
<script setup lang="ts"></script>
<script lang="ts">
export default {name: "Layout"};
</script>
