<template>
  <div class="l-popover-image">
    <m-popover position="right">
      <slot v-if="trigger" name="custom-trigger"></slot>
      <template v-else>
        <img :src="config.preview?.src" :width="config.preview?.style?.width ?? 80" v-bind="config.preview" />
      </template>
      <template #content>
        <img :src="config.popover.src" :width="config.popover.style?.width ?? 80" v-bind="config.popover" />
      </template>
    </m-popover>
  </div>
</template>

<script setup lang="ts">
import {useSlots} from "vue";
import {ILPopoverImage} from "./interface";

defineProps<{config: ILPopoverImage}>();

const trigger = !!useSlots()["custom-trigger"];
</script>
