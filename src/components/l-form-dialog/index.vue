<template>
  <m-modal
    v-if="config.dialog"
    :visible="config.dialog.visible"
    :title="config.dialog?.title"
    modal-class="l-form-dialog-modal"
    v-bind="{...defaultCondig, ...config.dialog?.others}"
    @cancel="cancel"
    @before-open="resetFormData"
  >
    <CustomVueScrollbar id="l-form-dialog-modal-scrollbar" style="max-height: calc(100vh - 300px)">
      <l-form ref="modalFormRef" :config="config">
        <!-- 自定义搜索插槽 -->
        <template v-for="slot in slots" :key="slot" #[slot]="rows">
          <slot :name="slot" :item="rows.item" :form="rows.form"></slot>
        </template>
      </l-form>
    </CustomVueScrollbar>
    <template #footer>
      <!-- left -->
      <template v-if="config.form?.operates?.left?.length">
        <m-button
          v-for="item in config.form.operates.left"
          :key="item.name"
          class="m-lr4"
          v-bind="item.others"
          @click="() => emits('operate', item.name)"
        >
          {{ item.name }}
        </m-button>
      </template>
      <!-- no-center -->
      <template v-if="!config.form?.operates?.center">
        <m-button v-if="config.form?.operates?.centerShowResetButton" class="m-lr4" @click="() => resetFields()">
          重置
        </m-button>
        <m-button class="m-lr4" type="primary" @click="() => submit()">提交</m-button>
      </template>
      <!-- center -->
      <template v-if="config.form?.operates?.center?.length">
        <m-button
          v-for="item in config.form.operates.center"
          :key="item.name"
          class="m-lr4"
          v-bind="item.others"
          @click="() => emits('operate', item.name)"
        >
          {{ item.name }}
        </m-button>
      </template>
      <!-- right -->
      <template v-if="config.form?.operates?.right?.length">
        <m-button
          v-for="item in config.form.operates.right"
          :key="item.name"
          v-bind="item.others"
          @click="() => emits('operate', item.name)"
        >
          {{ item.name }}
        </m-button>
      </template>
    </template>
  </m-modal>
</template>

<script setup lang="ts">
import {ref, reactive, useSlots} from "vue";
import CustomVueScrollbar from "custom-vue-scrollbar";
import "custom-vue-scrollbar/dist/style.css";
import {ILFormDialog} from "./interface";
import {useMessage} from "@/hooks/useMessage";

const defaultCondig = {
  width: 620,
  titleAlign: "start",
  unmountOnClose: true,
  draggable: true,
  escToClose: false,
  maskClosable: false,
  alignCenter: false,
  cancelText: "重置",
  okText: "提交",
};
const props = defineProps<{config: ILFormDialog; defaultFormData: any}>();
const emits = defineEmits(["operate", "submit"]);
const slots = Object.keys(useSlots());
const config = reactive(props.config);
const modalFormRef = ref();

/**
 * 重置表单
 */
const resetFields = (name?: string) => {
  name ? modalFormRef.value.resetFields(name) : modalFormRef.value.resetFields();
  resetFormData();
};

/**
 * 校验表单
 */
const validate = (name?: string) => (name ? modalFormRef.value.validateField(name) : modalFormRef.value.validate());

/**
 * 提交表单
 */
const submit = async () => {
  const error = await validate();
  if (!error) {
    emits("submit");
    cancel();
  } else {
    const OFFSET_TOP = (document as any).querySelector(".arco-form-item-message")?.offsetTop;
    if (OFFSET_TOP) {
      const FORM_CONTAINER = (document as any).querySelector("#l-form-dialog-modal-scrollbar");
      FORM_CONTAINER.scrollTo({
        top: OFFSET_TOP - 56,
        left: 0,
        behavior: "smooth",
      });
    }
    useMessage().error("请完整填写表单");
  }
};

/**
 * 关闭弹出框
 */
const cancel = () => (config.dialog.visible = false);

/**
 * 打开弹出框重置数据
 */
const resetFormData = () => (config.form.data = props.defaultFormData);

defineExpose({resetFields, validate});
</script>
