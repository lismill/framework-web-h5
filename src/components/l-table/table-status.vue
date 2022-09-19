<template>
  <div v-if="config.status?.items?.length" class="l-table-status">
    <m-tabs
      :default-active-key="config.search?.data[config.status.prop] ?? config.status.items[0].value"
      @change="statusChange"
    >
      <m-tab-pane v-for="item in config.status.items" :key="item.value">
        <template #title>
          {{ item.name }}
          <span v-if="item.total" style="color: rgb(var(--red-6))">({{ item.total }})</span>
        </template>
      </m-tab-pane>
    </m-tabs>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const props = defineProps<{config: any}>();
const config = reactive(props.config);
const emits = defineEmits(["change"]);

/**
 * 切换状态
 * @param key
 */
const statusChange = (key: string | number) => {
  config.search.data[config.status.prop] = key;
  emits("change");
};
</script>
