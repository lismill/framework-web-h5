<template>
  <van-tabbar v-model="index" v-bind="props.config" @change="handleChange">
    <van-tabbar-item
      v-for="navbar in useGlobalConfig.navbars"
      :key="navbar.name"
      :icon="navbar.icon"
      v-bind="(navbar as any).config"
    >
      {{ navbar.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import {Toast} from "vant";
import type {TabbarProps} from "vant";
import "vant/es/toast/style";
import {useGlobalConfig} from "@/hooks/useGlobalConfig";

const props = defineProps<{config?: TabbarProps | any}>();
const ROUTER = useRouter();

// 当前激活 Navbar
const index = ref(0);

/**
 * 切换 Navbar
 */
const handleChange = (index: number) => {
  const {path} = useGlobalConfig.navbars[index as number];
  path ? ROUTER.push(path) : Toast("路由不存在");
};
</script>
