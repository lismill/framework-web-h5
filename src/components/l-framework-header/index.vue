<template>
  <van-nav-bar v-bind="{...defaultConfig, ...props.config}" @click-left="clickLeft" />
</template>
<script setup lang="ts">
import type {NavBarProps} from "vant";

const props = defineProps<{config?: NavBarProps | any}>();
const ROUTE = useRoute();
const ROUTER = useRouter();
const defaultConfig = reactive({
  title: "",
  fixed: true,
  border: true,
  leftArrow: true,
  placeholder: true,
  safeAreaInsetTop: true,
});

/**
 * 点击头部左侧按钮
 */
const clickLeft = () => (window.history.state.back ? ROUTER.go(-1) : ROUTER.push("/"));

/**
 * 路由变化修改标题
 */
watch(
  () => ROUTE.path,
  () => (defaultConfig.title = ROUTE.meta?.title as string),
  {immediate: true},
);
</script>
