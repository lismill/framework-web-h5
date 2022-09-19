<template>
  <m-card title="折线图">
    <l-echarts-line-2 :data="data"></l-echarts-line-2>
  </m-card>
</template>
<script setup lang="ts">
import {IData} from "@/components/l-echarts-line-2/interface";

/**
 * 模拟数据
 */
const DATAS_TODAY: Array<{time: string; value: number}> = [];
const DATAS_YESTERDAY: Array<{time: string; value: number}> = [];
for (let i = 0; i < 24; i++) {
  DATAS_TODAY.push({time: `${i}:00`, value: Math.ceil(Math.random() * 100)});
  DATAS_YESTERDAY.push({time: `${i}:00`, value: Math.ceil(Math.random() * 100)});
}
const data: Array<IData> = [
  {
    name: "今日",
    color: "#1251FF",
    area: "rgba(80, 153, 255, 0.22)",
    data: DATAS_TODAY,
  },
  {
    name: "昨日",
    color: "#04CCCD",
    area: "rgba(4, 204, 205, 0.22)",
    data: DATAS_YESTERDAY,
  },
];
</script>
