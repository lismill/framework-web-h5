<template>
  <div class="bg-ffffff p-24">
    <l-table-edit :config="deepConfig">
      <template #custom>custom-slot</template>
    </l-table-edit>
    <div class="m-t16">
      {{ deepConfig.data }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {useCloneDeep} from "@/hooks/useCloneDeep";
import {config} from "./config";

const deepConfig = reactive(useCloneDeep(config));
</script>
