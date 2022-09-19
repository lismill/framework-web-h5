<template>
  <div class="l-table">
    <h3 v-if="config.title">{{ config.title }}</h3>
    <m-spin :loading="loading" :size="28">
      <!-- 自定义头部插槽 -->
      <div v-if="customHeader" class="m-b16"><slot name="custom-header"></slot></div>
      <!-- 表格搜索 -->
      <table-search :config="config" @change="queryData">
        <!-- 自定义搜索插槽 -->
        <template v-for="slot in slots" :key="slot" #[slot]="rows">
          <slot :name="slot" :rows="rows.rows"></slot>
        </template>
      </table-search>
      <!-- 表格状态栏 -->
      <table-status :config="config" @change="queryData"></table-status>
      <!-- 表格工具栏 -->
      <table-toolbar :config="config" @operate="(name) => emits('operate', name)"></table-toolbar>
      <!-- 自定义中间插槽 -->
      <div v-if="customCenter" class="m-b16"><slot name="custom-center"></slot></div>
      <!-- 表格内容 -->
      <table-content :config="config">
        <!-- 自定义表格插槽 -->
        <template v-for="slot in slots" :key="slot" #[slot]="rows">
          <slot :name="slot" :rows="rows.rows" :index="rows.index"></slot>
        </template>
      </table-content>
      <!-- 自定义底部插槽 -->
      <div v-if="customFooter" class="m-tb16"><slot name="custom-footer"></slot></div>
      <!-- 表格底部 -->
      <table-footer
        :config="config"
        @pagination:change="queryData"
        @operate="(name) => emits('operate', name)"
      ></table-footer>
    </m-spin>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted, useSlots} from "vue";
import TableSearch from "./table-search.vue";
import TableStatus from "./table-status.vue";
import TableToolbar from "./table-toolbar.vue";
import tableContent from "./table-content.vue";
import tableFooter from "./table-footer.vue";

const props = defineProps<{config: any}>();
const config = reactive(props.config);
const emits = defineEmits(["operate", "queryData"]);
const slots = Object.keys(useSlots());
const customHeader = !!useSlots()["custom-header"];
const customCenter = !!useSlots()["custom-center"];
const customFooter = !!useSlots()["custom-footer"];
const loading = ref(false);

/**
 * 初始化数据
 */
const queryData = async (type?: string) => {
  if (!config.request) {
    emits("queryData", type);
    return;
  }

  loading.value = true;
  try {
    // 处理自定义分页参数
    const pageProps = config.footer?.pagination?.props?.page ?? "page";
    const sizeProps = config.footer?.pagination?.props?.size ?? "size";
    // 请求数据
    const res = await config.request({
      ...config.search?.data,
      [pageProps]: config.footer?.pagination?.page ?? 1,
      [sizeProps]: config.footer?.pagination?.size ?? 10,
    });

    // 选择表格设置默认禁用状态
    if (config?.modal) {
      config.table.data = res.data.rows.map((item: {id: number | string}) => {
        if (config.table?.selectedRows?.find((choose: {id: number | string}) => choose.id === item.id)) {
          return {...item, disabled: true};
        }
        return {...item, disabled: false};
      });
    } else {
      config.table.data = res.data.rows;
      config.table?.selectedRows && (config.table.selectedRows = []);
    }
    config.footer?.pagination && (config.footer.pagination.total = res.data.total);
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

onMounted(() => queryData());
defineExpose({queryData});
</script>

<style lang="scss" scoped>
.l-table {
  h3 {
    margin: 0;
    padding-bottom: 24px;
    font-size: 16px;
    font-weight: 500;
    color: #12141a;
  }
  :deep(.arco-spin) {
    max-width: 100%;
  }
  :deep(.arco-table-container .arco-table-content-scroll-x) {
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.35);
    }
    &::-webkit-scrollbar-track {
      background: #ffffff;
    }
  }
}
</style>
