<template>
  <div
    v-if="config.search?.data && config.search?.forms?.length"
    class="l-table-search"
    :class="[
      config.search.forms?.length > 2 && 'flex',
      config.search.forms?.length === 3 && 'total-3',
      config.search.forms?.length > 3 && 'more-3',
    ]"
  >
    <!-- form -->
    <m-form
      ref="formRef"
      class="form flex"
      direction="horizontal"
      :model="config.search.data"
      :auto-label-width="true"
      @submit="() => handleSubmit('submit')"
    >
      <m-row :gutter="16">
        <template v-for="item in config.search.forms" :key="item.field">
          <m-col v-if="item.type && item.type !== 'hidden'" :span="8">
            <!-- input -->
            <m-form-item v-if="item.type === 'input'" :label="item.label" :field="item.field" :rules="item.rules">
              <m-input
                v-model="config.search.data[item.field]"
                :allow-clear="true"
                :placeholder="`请输入${item.label}`"
                v-bind="item.others"
              />
            </m-form-item>
            <!-- select -->
            <m-form-item v-if="item.type === 'select'" :label="item.label" :field="item.field" :rules="item.rules">
              <m-select
                v-model="config.search.data[item.field]"
                :allow-clear="true"
                :placeholder="`请选择${item.label}`"
                :options="item.options"
                v-bind="item.others"
              >
              </m-select>
            </m-form-item>
            <!-- select-search -->
            <m-form-item
              v-if="item.type === 'select-search'"
              :label="item.label"
              :field="item.field"
              :rules="item.rules"
            >
              <l-form-select-search
                :placeholder="`请选择${item.label}`"
                v-bind="item.others"
                @change="(v) => (config.search.data[item.field] = v)"
              />
            </m-form-item>
            <!-- date -->
            <m-form-item v-if="item.type === 'date'" :label="item.label" :field="item.field" :rules="item.rules">
              <m-date-picker
                v-model="config.search.data[item.field]"
                style="width: 100%"
                :allow-clear="true"
                :placeholder="`请输入${item.label}`"
                v-bind="item.others"
              />
            </m-form-item>
            <!-- daterange -->
            <m-form-item v-if="item.type === 'daterange'" :label="item.label" :field="item.field" :rules="item.rules">
              <m-range-picker
                v-model="config.search.data[item.field]"
                :allow-clear="true"
                :placeholder="[`开始${item.label}`, `结束${item.label}`]"
                value-format="YYYY-MM-DD HH:mm:ss"
                v-bind="item.others"
              />
            </m-form-item>
            <!-- slot -->
            <m-form-item v-if="item.type === 'slot'" :label="item.label" :field="item.field" :rules="item.rules">
              <slot :name="item.field"></slot>
            </m-form-item>
          </m-col>
        </template>
        <!-- 筛选框小于两个跟随表单右侧 -->
        <m-col v-if="config.search.forms?.length <= 2" :span="8">
          <m-space class="search-button" :size="16">
            <m-button type="primary" html-type="submit">查询</m-button>
            <m-button v-if="config.search.forms?.length > 1" @click="resetFields()">重置</m-button>
          </m-space>
        </m-col>
      </m-row>
    </m-form>
    <!-- 筛选框大于两个固定表单右侧 -->
    <m-space v-if="config.search.forms?.length > 2" :size="0" class="search-button">
      <m-button type="primary" @click="handleSubmit('submit')">查询</m-button>
      <m-button @click="resetFields()">重置</m-button>
    </m-space>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";

const props = defineProps<{config: any}>();
const config = reactive(props.config);
const emits = defineEmits(["change"]);
const formRef = ref();

/**
 * 查询数据
 */
const handleSubmit = (type: string) => {
  // 重置分页
  if (config.footer?.pagination) {
    config.footer.pagination.page = 1;
    config.footer.pagination.size = 10;
  }
  emits("change", type);
};

/**
 * 重置表单
 */
const resetFields = (name?: string) => {
  name ? formRef.value.resetFields(name) : formRef.value.resetFields();
  handleSubmit("reset");
};
</script>

<style lang="scss" scoped>
.l-table-search {
  &.flex {
    align-items: flex-start;
  }
  .arco-form-item {
    margin-bottom: 16px;
  }
  &.more-3 {
    .search-button {
      justify-content: flex-end;
      display: block;
      margin-left: 16px;
      padding-left: 32px;
      border-left: 1px solid var(--color-neutral-3);
      .arco-space-item:first-child > button {
        margin-bottom: 16px !important;
      }
    }
  }
  &.total-3 {
    .search-button {
      justify-content: flex-start;
      display: flex;
      border-left: none;

      .arco-space-item:first-child > button {
        margin-right: 16px !important;
        margin-bottom: 0 !important;
      }
    }
  }
}
.arco-row-justify-start {
  width: 100% !important;
  .arco-col {
    padding-left: 0 !important;
    padding-right: 16px !important;
  }
}
</style>
