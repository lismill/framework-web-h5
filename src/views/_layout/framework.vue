<template>
  <div class="framework" :class="[USE_STORE_COMMON.fulllScreen ? 'fullscreen' : '']">
    <FrameworkHeader></FrameworkHeader>
    <div class="framework-footer">
      <FrameworkAside v-if="menuLeft"></FrameworkAside>
      <div class="framework-content">
        <FrameworkBreadcrumb v-if="menuHeader"></FrameworkBreadcrumb>
        <CustomVueScrollbar
          id="framework-content-scrollbar"
          class="framework-content-scrollbar"
          :style="{
            width: getWidth,
            height: menuHeader ? 'calc(100vh - 100px)' : 'calc(100vh - 56px)',
          }"
        >
          <FrameworkContent></FrameworkContent>
        </CustomVueScrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import CustomVueScrollbar from "custom-vue-scrollbar";
import "custom-vue-scrollbar/dist/style.css";
import FrameworkHeader from "./framework-header.vue";
import FrameworkBreadcrumb from "./framework-breadcrumb.vue";
import FrameworkAside from "./framework-aside.vue";
import FrameworkContent from "./index.vue";
import useStoreCommon from "@/store/common";

const USE_STORE_COMMON = useStoreCommon();

// 左侧菜单 & 顶部菜单
const ROUTE = useRoute();
const menuLeft = ref(true);
const menuHeader = ref(false);
const resetMenu = () => {
  menuLeft.value = (ROUTE?.meta?.menuLeft as boolean) ?? true;
  menuHeader.value = (ROUTE?.meta?.menuHeader as boolean) ?? false;
};

/**
 * 内容区域宽度
 */
const getWidth = computed(() => {
  // 全屏
  if (USE_STORE_COMMON.fulllScreen) {
    if (menuLeft.value) {
      return "calc(100vw - 200px)";
    }
    return "calc(100vw)";
  }
  // 固定宽度
  if (menuLeft.value) {
    return "1224px";
  }
  return "1440px";
});
watch(
  () => ROUTE.path,
  () => {
    resetMenu();
  },
);
onMounted(() => resetMenu());
</script>
