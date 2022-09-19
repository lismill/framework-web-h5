<template>
  <div class="l-upload-file">
    <m-upload
      v-bind="defaultConfig"
      v-model:file-list="fileLists"
      :disabled="disabled"
      :on-before-upload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
      @remove="handleRemove"
    >
      <div v-if="fileLists.length < defaultConfig.maxCount">
        <template v-if="defaultConfig.listType === 'picture-card'">
          <span class="plus" style="font-size: 20px; font-weight: 500; color: #888888">+</span>
        </template>
        <template v-else>
          <m-button class="flex">
            <l-ify-icon name="carbon:add" size="20" style="margin-left: -6px"></l-ify-icon>
            选择文件
          </m-button>
        </template>
      </div>
    </m-upload>
    <m-modal
      :visible="preview.visible"
      :title="preview.title"
      :footer="null"
      :draggable="true"
      :align-center="false"
      @cancel="handlePreviewCancel"
    >
      <img alt="example" style="width: 100%" :src="preview.url" />
    </m-modal>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {useMessage} from "@/hooks/useMessage";

const props = defineProps<{config?: any}>();
const emit = defineEmits(["file:change"]);

const defaultConfig = {
  action: "http://yapi.syy.dongchali.cn/mock/730/upload",
  listType: "picture-card",
  maxCount: 1,
  accept: "",
  data: {},
  headers: {},
  method: "post",
  multiple: false,
  withCredentials: true,
  ...props.config,
};
const fileLists = ref(props.config?.fileList ?? []);
const disabled = ref(props.config?.disabled ?? false);
const preview = reactive({
  visible: false,
  url: "",
  title: "",
});

/**
 * 文件上传之前
 */
const beforeUpload = (file: {size: number; type: string}): string | boolean => {
  // 文件类型校验
  const TYPES = ["image/", "video/", "audio/", "application/vnd.ms-excel"];
  if (!props.config?.accept) {
    if (!file.type.includes("image/")) {
      useMessage().error("上传文件类型有误!");
      return false;
    }
  } else {
    for (let i = 0; i < TYPES.length; i++) {
      if (props.config.accept.includes(TYPES[i])) {
        if (!file.type.includes(TYPES[i])) {
          useMessage().error("上传文件类型有误!");
          return false;
        }
      }
    }
  }

  // 文件大小校验
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    useMessage().error("Image must smaller than 2MB!");
    return false;
  }
  return true;
};

/**
 * 上传文件
 */
const handleChange = () => {
  // 根据服务器返回的数据结构处理
  // const FILE_LIST = fileLists.value.filter((item: any) => item.status === "done");
  emit("file:change", fileLists.value);
};

/**
 * 预览文件
 */
const handlePreview = (file: any) => {
  // 根据服务器返回的数据结构处理
  preview.visible = true;
  preview.url = file.url;
  preview.title = file.name;
};

/**
 * 取消预览文件
 */
const handlePreviewCancel = () => {
  preview.visible = false;
  preview.title = "";
};

/**
 * 删除文件
 */
const handleRemove = (file: any) => {
  fileLists.value = fileLists.value.filter((item: {uid: string}) => item.uid !== file.uid);
  emit("file:change", fileLists.value);
};

watch(
  () => props.config,
  (data) => {
    fileLists.value = data.fileList;
    disabled.value = data.disabled;
  },
);
</script>
