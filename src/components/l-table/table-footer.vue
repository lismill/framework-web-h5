<template>
  <div
    v-if="config.footer?.pagination?.total > 10"
    class="l-table-footer flex"
    :style="{justifyContent: config.footer.operates ? 'space-between' : 'flex-end'}"
  >
    <!-- 左侧操作 -->
    <div v-if="config.table?.selectedRows && config.footer?.operates?.length" class="left">
      <m-button
        v-for="item in config.footer.operates"
        :key="item.name"
        class="m-r8"
        v-bind="item.others"
        @click="emits('operate', item.name)"
      >
        {{ item.name }}
      </m-button>
    </div>
    <!-- 右侧分页 -->
    <div class="right">
      <m-pagination
        :total="config.footer.pagination.total"
        :current="config.footer.pagination.page"
        :page-size="config.footer.pagination.size"
        :page-size-options="config.footer.pagination.pageSizes"
        show-total
        show-jumper
        show-page-size
        v-bind="config.footer.pagination.others"
        @change="change"
        @page-size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const props = defineProps<{config: any}>();
const config = reactive(props.config);
const emits = defineEmits(["pagination:change", "operate"]);

/**
 * 切换当前页
 * @param current
 */
const change = (current: number) => {
  config.footer.pagination.page = current;
  emits("pagination:change");
};

/**
 * 切换每页显示条数
 * @param size
 */
const pageSizeChange = (size: number) => {
  config.footer.pagination.size = size;
  emits("pagination:change");
};
</script>

<style lang="scss" scoped>
.l-table-footer {
  justify-content: space-between;
}
</style>
