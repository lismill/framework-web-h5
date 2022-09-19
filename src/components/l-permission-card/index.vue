<template>
  <div class="l-permission-item" :style="{height: collapsed ? '64px' : '400px'}">
    <header class="p-l18 p-r18 flex" :class="[checkeds?.length ? 'hasBg' : '']">
      <m-checkbox :model-value="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">
        <span class="line">
          <span v-if="icon" class="bg"><img :src="icon" /></span>
          {{ config.name }}
        </span>
      </m-checkbox>
      <div class="icon">
        <l-ify-icon
          v-if="collapsed"
          class="cursor-pointer"
          name="entypo:chevron-down"
          size="16"
          color="#898B8F"
          @click="collapsed = !collapsed"
        />
        <l-ify-icon
          v-if="!collapsed"
          class="cursor-pointer"
          name="entypo:chevron-up"
          size="16"
          color="#898B8F"
          @click="collapsed = !collapsed"
        />
      </div>
    </header>
    <CustomVueScrollbar style="max-height: 333px; border-radius: 4px">
      <transition name="fade">
        <footer v-show="!collapsed" class="p-l18 p-b12">
          <m-checkbox-group v-model="checkeds" direction="vertical" @change="handleChange">
            <m-checkbox v-for="item in children" :key="item.name" :value="item.permission">
              {{ item.name }}
            </m-checkbox>
          </m-checkbox-group>
        </footer>
      </transition>
    </CustomVueScrollbar>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import uniq from "lodash/uniq";
import CustomVueScrollbar from "custom-vue-scrollbar";
import "custom-vue-scrollbar/dist/style.css";
import {ILPermissionCard} from "./interface";

const emits = defineEmits(["change"]);
const props = defineProps<{config: ILPermissionCard; index: number}>();
const {checked, children, icon, permission} = reactive(props.config);
const checkedAll = ref(checked?.length === children?.length);
const indeterminate = ref(!!checked?.length && checked.length + 1 !== children?.length);
const checkeds = ref(props.config.checked);
const collapsed = ref(false);

/**
 * 切换全选/取消全选
 * @param value
 */
const handleChangeAll = (value: boolean) => {
  indeterminate.value = false;
  if (value) {
    checkedAll.value = true;
    checkeds.value = (children as Array<ILPermissionCard>).map((item: {permission: string}) => item.permission);
    emits("change", uniq([permission, ...checkeds.value]), props.index);
  } else {
    checkedAll.value = false;
    checkeds.value = [];
    emits("change", uniq(checkeds.value), props.index);
  }
};

/**
 * 切换元素
 * @param values
 */
const handleChange = (values: string | any[]) => {
  if (checkeds.value?.length === children?.length) {
    checkedAll.value = true;
    indeterminate.value = false;
  } else if (values.length === 0) {
    checkedAll.value = false;
    indeterminate.value = false;
    emits("change", [], props.index);
    return;
  } else {
    checkedAll.value = false;
    indeterminate.value = true;
  }
  emits("change", uniq([permission, ...(checkeds?.value ?? [])]), props.index);
};
</script>

<style scoped lang="scss">
.l-permission-item {
  border: 1px solid #1966ff;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.25s;
  header {
    justify-content: space-between;
    min-width: 266px;
    height: 63px;
    line-height: 63px;
    border-radius: 4px;
    &.hasBg {
      background: linear-gradient(180deg, #f0f6ff 0%, #ffffff 100%);
    }
    .line {
      position: relative;
      top: 1px;
      width: 1px;
      height: 19px;
      border-left: 2px solid #dddee1;
      margin-left: 10px;
      padding-left: 16px;
      .bg {
        margin-right: 2px;
        img {
          position: relative;
          top: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
      }
    }
  }
  footer {
    border-radius: 4px;
    overflow: hidden;
    background-color: #ffffff;
  }
}

// fade
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
