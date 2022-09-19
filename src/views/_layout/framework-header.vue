<template>
  <div class="framework-header">
    <div class="framework-header-content flex">
      <div class="left flex">
        <img class="logo" src="@/assets/images/common/logo.png" alt="logo.png" />
        <span>中后台管理系统</span>
      </div>
      <div class="right flex">
        <template v-if="useEnv('development')">
          <div class="fullscreen">
            <span
              v-if="USE_STORE_COMMON.fulllScreen"
              class="cursor-pointer"
              @click="USE_STORE_COMMON.changeFulllScreen(false)"
            >
              <l-ify-icon name="emojione-v1:smiling-face-with-heart-eyes" size="18"></l-ify-icon>
            </span>
            <span v-else class="cursor-pointer" @click="USE_STORE_COMMON.changeFulllScreen(true)">
              <l-ify-icon name="emojione-v1:confounded-face" size="18"></l-ify-icon>
            </span>
          </div>
          <div class="m-lr16 line"></div>
        </template>
        <m-dropdown trigger="hover" @select="selectDropdown">
          <div class="userinfo cursor-pointer">超级管理员</div>
          <template #content>
            <m-doption>修改密码</m-doption>
            <m-doption>退出登录</m-doption>
          </template>
        </m-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted} from "vue";
import useStoreCommon from "@/store/common";
import {useEnv} from "@/hooks/useEnv";
import {jump} from "@/hooks/useWindow";

const USE_STORE_COMMON = useStoreCommon();

const watchContentScroll = () => {
  const scrollDOM: HTMLDivElement | null = document.querySelector("#framework-content-scrollbar");
  scrollDOM?.addEventListener("scroll", () => {
    if (scrollDOM.scrollTop > 16) {
      document.querySelector(".framework-header")?.classList.add("scroll");
      document.querySelector(".l-form .footer.footer-fixed")?.classList.add("scroll");
    } else {
      document.querySelector(".framework-header")?.classList.remove("scroll");
      document.querySelector(".l-form .footer.footer-fixed")?.classList.remove("scroll");
    }
  });
};

const selectDropdown = (v: string) => {
  switch (v) {
    case "退出登录":
      jump("/login");
      break;

    default:
      break;
  }
};

onMounted(() => {
  watchContentScroll();
});
</script>
<style scoped lang="scss"></style>
