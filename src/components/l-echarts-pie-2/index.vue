<template>
  <div :style="{height: `${height ?? 300}px`}">
    <l-echarts ref="charts" :option="getOptions()"></l-echarts>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import type {EChartsOption} from "echarts";
import {tooltip} from "@/utils/echarts";
import {IData} from "./interface";

const props = defineProps<{
  height?: number;
  data: IData;
}>();

const charts = ref();
watch(
  () => props,
  () => {
    charts.value.init(getOptions());
  },
  {deep: true},
);

const getOptions = (): EChartsOption => {
  return {
    tooltip: {
      show: true,
      borderWidth: 0,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      formatter: (params) => tooltip(params),
    },
    legend: {
      show: true,
      icon: "circle",
      width: "90%",
      itemWidth: 10,
      bottom: 0,
      itemGap: 16,
      textStyle: {
        height: 9,
        color: "#85878A",
        rich: {
          a: {
            verticalAlign: "middle",
          },
        },
      },
    },
    series: [
      {
        name: props.data.name,
        type: "pie",
        radius: ["42%", "63%"],
        itemStyle: {
          color(colors) {
            const {colorList} = props.data;
            if (colorList) return colorList[colors.dataIndex];
            return ["#FA3AA6", "#9580FF", "#FCAA80", "#3F72FE", "#34D5D6"][colors.dataIndex];
          },
        },
        bottom: 80,
        label: {
          alignTo: "labelLine",
          formatter: `{time|{d}%}\n{name|{b}}`,
          rich: {
            time: {
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 19,
              color: "#121314",
            },
            name: {
              fontSize: 12,
              lineHeight: 17,
              color: "#85878A",
            },
          },
        },
        data: props.data.data,
      },
    ],
  };
};
</script>
