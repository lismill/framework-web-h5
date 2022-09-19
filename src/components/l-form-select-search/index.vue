<template>
  <m-select
    v-model="activeValue"
    :placeholder="placeholder"
    :loading="loading"
    :options="options"
    :field-names="props.fieldNames"
    :allow-search="true"
    :filter-option="false"
    :allow-clear="true"
    :virtual-list-props="{height: 260}"
    @search="handleSearch"
    @change="handleChange"
  >
  </m-select>
</template>

<script setup lang="ts">
import uniqBy from "lodash/uniqBy";
import {useMessage} from "@/hooks/useMessage";

const props = defineProps<{
  /**
   * 选择框提示
   */
  placeholder?: string;

  /**
   * 远程搜索地址
   */
  request?: any;

  /**
   * 默认的选项数组
   */
  options?: Array<any>;

  /**
   * 自定义属性值
   */
  fieldNames?: {
    label: string;
    value: string;
  };
  /**
   * 默认展示的值，多用于编辑场景
   */
  defaultValue?: any;
}>();

const emits = defineEmits(["change"]);
const activeValue = ref(props?.defaultValue?.[props?.fieldNames?.value ?? "value"] ?? "");
const loading = ref(false);
const options = ref<any>([]);
props.defaultValue && (options.value = [...options.value, props.defaultValue]);
props.options?.length && (options.value = [...options.value, ...props.options]);

/**
 * 远程搜索
 */
const handleSearch = async () => {
  if (props.request) {
    try {
      loading.value = true;
      const res = await props.request();
      // 根据返回数据结构自定义
      options.value = uniqBy(
        [props.defaultValue, ...(props.options ?? []), ...res.data.rows],
        props.fieldNames?.label ?? "label",
      );
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  } else {
    useMessage().error("未配置远程搜索请求api参数");
  }
};
const handleChange = (item: string | number) => {
  emits("change", item);
};
</script>

<style lang="scss" scoped></style>
