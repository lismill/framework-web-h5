<template>
  <div class="l-editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="config?.toolbarConfig ?? {}"
      :mode="config?.mode ?? 'simple'"
    />
    <Editor
      v-model="valueHtml"
      style="overflow-y: hidden"
      :style="{height: `${config?.height ?? 360}px`}"
      :default-config="config.editorConfig"
      :mode="config?.mode ?? 'simple'"
      @on-created="handleCreated"
      @on-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import {watch, onBeforeUnmount, ref, reactive, shallowRef} from "vue";
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import {IDomEditor} from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";
import "./index.scss";
import {useEhemeralKeyUpload} from "@/hooks/useEhemeralKeyUpload";
import {ILEditor} from "./interface";

const props = defineProps<{config: ILEditor}>();
const emits = defineEmits(["change"]);
const config = reactive(props.config);
config.editorConfig = {placeholder: "请输入内容...", readOnly: config?.disabled ?? false, MENU_CONF: {}};

/**
 * 自定义上传图片
 */
config.editorConfig.MENU_CONF.uploadImage = {
  async customUpload(file: any, insertFn: any) {
    try {
      const res = await useEhemeralKeyUpload(file);
      insertFn((res as any).url);
    } catch (error) {
      console.log(error);
    }
  },
};

// 编辑器实例
const editorRef = shallowRef();

// 内容HTML
const valueHtml = ref(config?.content);

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => (editorRef.value = editor);
const handleChange = (editor: IDomEditor) => {
  editor.isEmpty() ? emits("change", "") : emits("change", editor.getHtml());
};

// 禁用/启用编辑器
watch(
  () => props.config.disabled,
  (v) => (v ? editorRef.value.disable() : editorRef.value.enable()),
);
// 禁用/启用编辑器
watch(
  () => props.config.content,
  (v) => (valueHtml.value = v),
);
</script>
<style scoped lang="scss">
.l-editor {
  width: 100%;
  border: 1px solid #d9d9d9;
}
.w-e-full-screen-container {
  z-index: 9999;
}
</style>
