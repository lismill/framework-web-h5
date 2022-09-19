<template>
  <div class="l-table-operate">
    <template v-for="(item, index) in operateList" :key="index">
      <!-- 操作元素小于等于三个 -->
      <template v-if="index < 3">
        <m-popconfirm
          v-if="item.popconfirm"
          :content="item.popconfirm"
          type="warning"
          @ok="emits('handle:click', item.name)"
        >
          <a class="link">{{ item.name }}</a>
          <span v-if="operateList.length !== index + 1" class="split-line">|</span>
        </m-popconfirm>
        <template v-else>
          <a class="link" @click="emits('handle:click', item.name)">{{ item.name }}</a>
          <span v-if="operateList.length !== index + 1" class="split-line">|</span>
        </template>
      </template>
    </template>
    <!-- 操作元素大于三个 -->
    <template v-if="operateList.length > 3">
      <m-dropdown trigger="hover">
        <img class="ellipsis" src="./images/ellipsis.png" />
        <template #content>
          <template v-for="item in drop(operateList, 3)" :key="item.name">
            <m-doption @click="emits('handle:click', item.name)">
              {{ item.name }}
            </m-doption>
          </template>
        </template>
      </m-dropdown>
    </template>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import drop from "lodash/drop";
import {ILTableOperate} from "./interface";
import useStorePermission from "@/store/permission";

const USE_STORE_PERMISSION = useStorePermission();
const props = defineProps<{list: Array<ILTableOperate>}>();
const operateList = computed(() => {
  return props.list.filter((item) => {
    // 如果绑定权限节点进行校验
    return item.permission ? USE_STORE_PERMISSION.permissions.includes(item.permission) && item.show : item.show;
  });
});
const emits = defineEmits(["handle:click"]);
</script>
<style lang="scss" scoped>
.l-table-operate {
  a.link {
    margin: 0 8px;
    color: #1966ff;
    font-size: 14px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  span.split-line {
    color: #e9e9e9;
  }
  .ellipsis {
    cursor: pointer;
    position: relative;
    top: 5px;
    left: 8px;
    width: 16px;
  }
}
.operate-omit-list {
  color: #1966ff;
}
</style>
