<template>
  <div id="echarts" ref="chart"></div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import * as echarts from "echarts";
import type {EChartsType, EChartsOption} from "echarts";

const props = defineProps<{option: EChartsOption}>();

const chart = ref<HTMLElement>();
let myEcharts: EChartsType | null = null;

const init = (data?: any) => {
  if (myEcharts) myEcharts.dispose();
  myEcharts = echarts.init(chart.value as HTMLElement);
  myEcharts.setOption(data ?? props.option, true);
  window.addEventListener("resize", () => (myEcharts as EChartsType).resize());
};

onMounted(() => init());

defineExpose({init});
</script>

<style lang="scss" scoped>
#echarts {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
