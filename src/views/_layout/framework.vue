<template>
  <router-view v-slot="{Component}">
    <keep-alive>
      <div id="app-container" :style="{background: useGlobalConfig?.background}">
        <l-framework-header v-if="(ROUTE.meta as any)?.header?.show" :config="ROUTE.meta.header"></l-framework-header>
        <component :is="Component" :key="$route.name" />
        <l-framework-navbar v-if="(ROUTE.meta as any)?.navbar?.show" :config="ROUTE.meta.navbar"></l-framework-navbar>
      </div>
    </keep-alive>
  </router-view>
</template>
<script setup lang="ts">
import {useGlobalConfig} from "@/hooks/useGlobalConfig";

const ROUTE = useRoute();
</script>
<script lang="ts">
export default {name: "Layout"};
</script>
