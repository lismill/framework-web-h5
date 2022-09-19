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
    series: [
      {
        name: props.data.name,
        type: "pie",
        data: props.data.data,
        radius: ["67%", "90%"],
        itemStyle: {
          color(colors) {
            const {colorList} = props.data;
            if (colorList) return colorList[colors.dataIndex];
            return ["#FA3AA6", "#9580FF", "#FCAA80", "#3F72FE", "#34D5D6"][colors.dataIndex];
          },
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            formatter: "{value|{c}}\n{name|{b}}",
            rich: {
              value: {
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 26,
                color: "#121314",
              },
              name: {
                fontSize: 12,
                lineHeight: 20,
                color: "#85878A",
              },
            },
          },
        },
      },
    ],
  };
};
</script>
