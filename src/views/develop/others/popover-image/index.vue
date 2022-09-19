<template>
  <div class="bg-ffffff p-24">
    <h3 class="page-title m-b24">气泡图片</h3>
    <!-- 简单使用 -->
    <l-popover-image :config="config1"> </l-popover-image>

    <!-- 简单使用 -->
    <l-popover-image :config="config2" class="m-t16"> </l-popover-image>

    <!-- 自定义 -->
    <l-popover-image :config="config3" class="m-t16">
      <template #custom-trigger>
        <m-button>自定义</m-button>
      </template>
    </l-popover-image>
  </div>
</template>
<script setup lang="ts">
import {ILPopoverImage} from "@/components/l-popover-image/interface";

const config1: ILPopoverImage = {
  preview: {
    src: "https://i.postimg.cc/8kq8ZyL2/lean.png",
    style: {
      width: 80,
    },
  },
  popover: {
    src: "https://i.postimg.cc/8kq8ZyL2/lean.png",
    style: {
      width: 600,
    },
  },
};

const config2: ILPopoverImage = {
  preview: {
    src: "https://i.postimg.cc/8kq8ZyL2/lean.png",
    style: {
      width: 200,
    },
  },
  popover: {
    src: "https://i.postimg.cc/8kq8ZyL2/lean.png",
    style: {
      width: 600,
    },
  },
};

const config3: ILPopoverImage = {
  popover: {
    src: "https://i.postimg.cc/8kq8ZyL2/lean.png",
    style: {
      width: 800,
    },
  },
};
</script>
