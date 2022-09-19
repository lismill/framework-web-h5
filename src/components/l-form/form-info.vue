<template>
  <div class="m-t4 color-999999 font-13" v-html="info"></div>
</template>
<script setup lang="ts">
defineProps<{
  info: string;
}>();
</script>
