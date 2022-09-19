<template>
  <div class="l-table-edit">
    <!-- 自定义按钮 -->
    <template v-if="customTrigger">
      <slot name="custom-trigger"></slot>
    </template>
    <!-- 默认按钮 -->
    <template v-else>
      <m-button type="primary" @click="add">
        {{ config?.others?.title ?? "添加数据" }}
      </m-button>
    </template>
    <!-- 编辑表格 -->
    <m-table class="m-t16" v-bind="{...defaultConfig, ...config.others}" :columns="config.columns" :data="config.data">
      <!-- 内容 -->
      <template #columns>
        <m-table-column
          v-for="item in config.columns"
          :key="item.title"
          :title="item.title"
          :width="item.width"
          :align="item.align"
          v-bind="item.others"
        >
          <template #cell="{record, rowIndex}">
            <m-form
              :ref="(el: HTMLElement) => setFormRefs(el, item.type)"
              :model="config.data[rowIndex]"
              :auto-label-width="true"
            >
              <!-- 自定义插槽 -->
              <template v-if="item?.type === 'slot'">
                <slot :name="item?.dataIndex ?? ''" :rows="record" :index="rowIndex"></slot>
              </template>
              <!-- 表格列 -->
              <template v-else>
                <!-- 序号 -->
                <template v-if="['#', '序号'].includes(item.title)">{{ rowIndex + 1 }}</template>
                <!-- 默认列 -->
                <template v-else>
                  <!-- type === text -->
                  <m-form-item
                    v-if="item?.type === 'text'"
                    :field="item.dataIndex"
                    :rules="item.rules"
                    :validate-trigger="['change', 'input']"
                  >
                    {{ record[item.dataIndex] }}
                  </m-form-item>

                  <!-- type === input -->
                  <m-form-item
                    v-if="item?.type === 'input'"
                    :field="item.dataIndex"
                    :rules="item.rules"
                    :validate-trigger="['change', 'input']"
                  >
                    <m-input
                      v-model="record[item.dataIndex]"
                      :allow-clear="true"
                      :placeholder="`请输入${item.title}`"
                      v-bind="item.others"
                    ></m-input>
                  </m-form-item>

                  <!-- type === switch -->
                  <m-form-item
                    v-if="item?.type === 'switch'"
                    :field="item.dataIndex"
                    :rules="item.rules"
                    :validate-trigger="['change', 'input']"
                  >
                    <m-switch v-model="record[item.dataIndex]" :allow-clear="true" v-bind="item.others"></m-switch>
                  </m-form-item>

                  <!-- type === select -->
                  <m-form-item
                    v-if="item?.type === 'select'"
                    :field="item.dataIndex"
                    :rules="item.rules"
                    :validate-trigger="['change', 'input']"
                  >
                    <m-select
                      v-model="record[item.dataIndex]"
                      :allow-clear="true"
                      :placeholder="`请选择${item.title}`"
                      :options="item.options"
                      v-bind="item.others"
                    >
                    </m-select>
                  </m-form-item>
                  <!-- type === date -->
                  <m-form-item
                    v-if="item?.type === 'date'"
                    :field="item.dataIndex"
                    :rules="item.rules"
                    :validate-trigger="['change', 'input']"
                  >
                    <m-date-picker
                      v-model="record[item.dataIndex]"
                      style="width: 100%"
                      :allow-clear="true"
                      :placeholder="`请输入${item.title}`"
                      v-bind="item.others"
                    />
                  </m-form-item>
                  <!-- type === daterange -->
                  <m-form-item
                    v-if="item?.type === 'daterange'"
                    :field="item.dataIndex"
                    :rules="item.rules"
                    :validate-trigger="['change', 'input']"
                  >
                    <m-range-picker
                      v-model="record[item.dataIndex]"
                      :allow-clear="true"
                      :placeholder="[`开始${item.title}`, `结束${item.title}`]"
                      value-format="YYYY-MM-DD"
                      v-bind="item.others"
                    />
                  </m-form-item>
                </template>
              </template>
            </m-form>
          </template>
        </m-table-column>
        <!-- 删除列 -->
        <m-table-column title="操作" :width="100">
          <template #cell="{rowIndex}">
            <m-popconfirm content="确定删除数据么?" type="warning" @ok="remove(rowIndex)">
              <a class="link">删除</a>
            </m-popconfirm>
          </template>
        </m-table-column>
      </template>
    </m-table>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed, useSlots} from "vue";
import compact from "lodash/compact";
import {useMessage} from "@/hooks/useMessage";

const props = defineProps<{config: any}>();
const config = reactive(props.config);
const customTrigger = !!useSlots()["custom-trigger"];

const formRefs = ref<any>([]);
const setFormRefs = (el: HTMLElement, type: string) => el && TYPES.includes(type) && formRefs.value.push(el);
const TYPES = ["input", "switch", "select", "date", "daterange"];
const FORM_ITEMS = config.columns.filter((item: {type: string}) => TYPES.includes(item.type));
const LAST_FORM_ITEMS = computed(() => formRefs.value.slice(-FORM_ITEMS.length));

/**
 * 添加数据
 */
const ERRORS_RESULT: any = ref([]);
const add = async () => {
  Promise.all(LAST_FORM_ITEMS.value.map((item: {validate: () => any}) => item.validate())).then((res) => {
    ERRORS_RESULT.value = compact(res);
    ERRORS_RESULT.value.length ? useMessage().error("请完整填写表单") : config.data.push({});
  });
};

/**
 * 删除数据
 */
const remove = (index: number) => config.data.splice(index, 1);

// 默认数据
const defaultConfig = {
  size: "large",
  bordered: false,
  pagination: false,
  scroll: {x: "100%"},
};
</script>
<style scoped lang="scss">
.l-table-edit {
  a.link {
    color: #1966ff;
  }
  :deep(.arco-form-item) {
    margin-bottom: 0;
  }
  :deep(.arco-form-item-message) {
    display: none;
  }
  :deep(.arco-form-item-label-col) {
    padding-right: 0;
  }
  :deep(.arco-form-item-label) {
    position: relative;
    left: -2px;
  }
}
</style>
