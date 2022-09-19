<template>
  <div class="bg-ffffff p-24">
    <h3 class="page-title m-b24">上传文件</h3>
    <l-upload-file :config="upload.config" @file:change="(fileList) => (upload.fileLists = fileList)"></l-upload-file>
    <div class="m-t16">
      {{ upload.fileLists }}
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";

const upload = reactive({
  config: {
    limit: 6,
    fileList: [
      {
        name: "lean.png",
        url: "https://i.postimg.cc/8kq8ZyL2/lean.png",
        response: {
          status: "done",
        },
      },
    ],
  },
  fileLists: [
    {
      name: "lean.png",
      url: "https://i.postimg.cc/8kq8ZyL2/lean.png",
      response: {
        status: "done",
      },
    },
  ],
});
</script>

<style scoped lang="scss"></style>
