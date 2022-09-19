<template>
  <div
    v-if="config.toolbar?.leftOperates || config.toolbar?.rightOperates"
    class="l-table-toolbar m-b16 flex"
    :style="{justifyContent: config.toolbar.leftOperates ? 'space-between' : ''}"
  >
    <!-- left -->
    <div v-if="config.toolbar.leftOperates" class="left flex">
      <div v-if="config.table?.selectedRows && config.footer?.pagination?.total" class="total p-r16 m-r16">
        {{
          config.table?.selectedRows.length > 0
            ? `已选 ${config.table.selectedRows.length} 条数据`
            : `共 ${config.footer.pagination.total} 条数据`
        }}
      </div>
      <template v-for="item in LEFT_OPERATES" :key="item.name">
        <div v-if="!item.others?.hidden" class="flex m-r8">
          <m-button size="mini" v-bind="item.others" @click="emits('operate', item.name)">
            {{ item.name }}
          </m-button>
          <span v-if="item.split" class="split-line"></span>
        </div>
      </template>
    </div>
    <!-- right -->
    <div v-if="config.toolbar.rightOperates" class="right">
      <template v-for="item in RIGHT_OPERATES" :key="item.name">
        <m-button v-if="!item.others?.hidden" v-bind="item.others" @click="emits('operate', item.name)">
          {{ item.name }}
        </m-button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import useStorePermission from "@/store/permission";

const USE_STORE_PERMISSION = useStorePermission();
const props = defineProps<{config: any}>();
const config = reactive(props.config);
const emits = defineEmits(["operate"]);

// 左侧辅助按钮
const LEFT_OPERATES: any = computed(() => {
  if (config.toolbar?.leftOperates?.length) {
    return config.toolbar.leftOperates.filter((item: any) => {
      return item.others?.permission ? USE_STORE_PERMISSION.permissions.includes(item.others.permission) : true;
    });
  }
  return [];
});

// 右侧主要按钮
const RIGHT_OPERATES: any = computed(() => {
  if (config.toolbar?.rightOperates?.length) {
    return config.toolbar.rightOperates.filter((item: any) => {
      return item.others?.permission ? USE_STORE_PERMISSION.permissions.includes(item.others.permission) : true;
    });
  }
  return [];
});
</script>

<style lang="scss" scoped>
.l-table-toolbar {
  .left {
    .total {
      font-size: 12px;
      color: #252931;
      border-right: 1px solid var(--color-neutral-3);
    }
    .split-line {
      margin: 0 8px 0 16px;
      width: 1px;
      height: 16px;
      background-color: var(--color-neutral-3);
    }
  }
  .right {
    button:not(:first-child) {
      margin-left: 8px;
    }
  }
}
</style>
