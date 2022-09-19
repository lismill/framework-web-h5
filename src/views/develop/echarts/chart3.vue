<template>
  <m-card title="饼图">
    <div style="width: 200px; margin: 0 auto">
      <l-echarts-pie-1 :data="data"></l-echarts-pie-1>
    </div>
  </m-card>
</template>

<script setup lang="ts">
import {IData} from "@/components/l-echarts-pie-1/interface";

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
<style scoped lang="scss">
.echarts-info {
  p.name {
    font-size: 14px;
    font-weight: 500;
    color: #565960;
    line-height: 20px;
  }
  p.value {
    margin: 3px 0;
    font-size: 24px;
    font-weight: bold;
    color: #121314;
    line-height: 28px;
  }
  p.yesterday {
    color: #5e6066;
    line-height: 17px;
  }
}
</style>
