<template>
  <div class="framework-breadcrumb">
    <m-breadcrumb>
      <m-breadcrumb-item>
        <span class="cursor-pointer" @click="ROUTER.push('/')">首页</span>
      </m-breadcrumb-item>
      <m-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.name">
        <span v-if="index !== breadcrumbs.length - 1" class="cursor-pointer" @click="ROUTER.push(item)">
          {{ item.meta?.title }}
        </span>
        <span v-else>{{ item.meta?.title }}</span>
      </m-breadcrumb-item>
    </m-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import {watch, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const breadcrumbs: any = ref([]);
const ROUTE = useRoute();
const ROUTER = useRouter();

console.log(breadcrumbs);

watch(
  () => ROUTE.path,
  () => {
    switch (ROUTE.query?.operate) {
      case "add":
        ROUTE.matched[ROUTE.matched.length - 1].meta.title = `新增${ROUTE.meta.title}`;
        break;
      case "edit":
        ROUTE.matched[ROUTE.matched.length - 1].meta.title = `编辑${ROUTE.meta.title}`;
        break;
      case "view":
        ROUTE.matched[ROUTE.matched.length - 1].meta.title = `查看${ROUTE.meta.title}`;
        break;
      default:
        break;
    }
    breadcrumbs.value = ROUTE.matched;
  },
  {
    immediate: true,
  },
);
</script>
