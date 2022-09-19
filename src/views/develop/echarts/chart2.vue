<template>
  <m-card title="饼图">
    <l-echarts-pie-2 :data="data"></l-echarts-pie-2>
  </m-card>
</template>

<script setup lang="ts">
import {IData} from "@/components/l-echarts-pie-2/interface";

const data: IData = {
  name: "占比",
  colorList: ["#FA3AA6", "#9580FF", "#FCAA80", "#3F72FE", "#34D5D6"],
  data: [
    {value: 706, name: "抖音"},
    {value: 655, name: "快手"},
    {value: 735, name: "天猫"},
    {value: 580, name: "京东"},
    {value: 484, name: "有赞"},
  ],
};
</script>
