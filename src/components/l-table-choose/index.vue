<template>
  <div class="l-table-choose">
    <!-- 自定义按钮 -->
    <template v-if="customTrigger">
      <slot name="custom-trigger"></slot>
    </template>
    <!-- 默认按钮 -->
    <template v-else>
      <m-button type="primary" @click="modalConfig.modal.visible = true">
        {{ modalConfig.modal?.others?.title ?? "添加数据" }}
      </m-button>
    </template>
    <!-- 已选表格 -->
    <div class="m-t16">
      <l-table :config="chooseConfig">
        <template #operate="{index}">
          <l-table-operate
            :list="[{name: '删除', show: true, popconfirm: '确认删除数据么?'}]"
            @handle:click="remove(index)"
          ></l-table-operate>
        </template>
      </l-table>
    </div>
  </div>
  <!-- 选择表格 - 弹出框 -->
  <m-modal
    v-model:visible="modalConfig.modal.visible"
    width="1200"
    :draggable="true"
    :closable="false"
    :mask-closable="false"
    :esc-to-close="false"
    :hide-cancel="true"
    ok-text="添加数据"
    modal-class="l-table-choose-modal"
    v-bind="modalConfig.modal?.others"
    @ok="handleOk"
  >
    <template #title>{{ modalConfig.modal?.others?.title }}</template>
    <CustomVueScrollbar style="max-height: calc(100vh - 320px)">
      <l-table :config="modalConfig"></l-table>
    </CustomVueScrollbar>
  </m-modal>
</template>

<script setup lang="ts">
import {reactive, useSlots} from "vue";
import uniqBy from "lodash/uniqBy";
import CustomVueScrollbar from "custom-vue-scrollbar";
import "custom-vue-scrollbar/dist/style.css";
import {ILTable} from "../l-table/interface";
import {ILTableChoose} from "./interface";

const props = defineProps<{modalConfig: ILTableChoose; chooseConfig: ILTable}>();
const emits = defineEmits(["choose:change"]);
const customTrigger = !!useSlots()["custom-trigger"];
const modalConfig = reactive(props.modalConfig);
const chooseConfig = reactive(props.chooseConfig);

/**
 * 点击确认选择
 */
const handleOk = () => {
  // 处理多选数据
  if (modalConfig.table?.selectedType === "checkbox") {
    const CHOOSE_DATAS = uniqBy(chooseConfig.table?.data.concat(modalConfig.table.selectedRows), "id");
    chooseConfig.table.data = CHOOSE_DATAS;
    disabledData();
  } else if (modalConfig.table?.selectedType === "radio") {
    // 处理单选数据
    chooseConfig.table.data = modalConfig.table?.selectedRows ?? [];
  }
  emitData();
};

/**
 * 删除已选项
 * @param index
 */
const remove = (index: number) => {
  // 处理多选数据
  if (modalConfig.table?.selectedType === "checkbox") {
    modalConfig.table.selectedRows?.splice(index, 1);
    chooseConfig.table.data = modalConfig.table?.selectedRows ?? [];
    disabledData();
  } else if (modalConfig.table?.selectedType === "radio") {
    // 处理单选数据
    chooseConfig.table.data = [];
    modalConfig.table.selectedRows = [];
  }
  emitData();
};

/**
 * 设置禁用状态
 */
const disabledData = () => {
  const DATAS = modalConfig.table.data.map((item) => {
    if (chooseConfig.table.data.find((choose) => choose.id === item.id)) {
      return {...item, disabled: true};
    }
    return {...item, disabled: false};
  });
  modalConfig.table.data = DATAS;
};

/**
 * 提交数据
 */
const emitData = () => emits("choose:change", chooseConfig.table.data);
</script>

<style lang="scss">
.l-table-choose-modal {
  .scrollbar__thumbPlaceholder--vertical {
    width: 8px;
    top: -1px !important;
    right: -12px !important;
  }
}
</style>
