<template>
  <div v-if="loading" id="frameword-loading">
    <div>
      <l-ify-icon name="eos-icons:loading" size="40"></l-ify-icon>
      <p>加载中...</p>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {ref} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import useStorePermission from "./store/permission";

const USE_STORE_PERMISSION = useStorePermission();

dayjs.locale("zh-cn");

const loading = ref(true);
setTimeout(() => {
  loading.value = false;
  USE_STORE_PERMISSION.changePermission("100000,100001");
}, 300);
</script>
