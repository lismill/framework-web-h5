/**
 * tooltip
 * @param params
 * @returns
 */
export const tooltip = (params: any) => {
  let text = "";
  if (Array.isArray(params)) {
    text = `<div style="margin-bottom: 7px; font-weight: bolder; color: rgba(18, 19, 20, 1);">${params[0].name}</div>`;
    params.forEach((item: any) => {
      text += `<div style="
          display: flex;
          align-items: center;
          margin-top: 6px;
          padding: 6px;
          border-radius: 4px;
          background: #ffffff;
        ">
            <p style="
              width: 8px;
              height: 8px;
              margin-right: 5px;
              border-radius: 4px;
              background: ${item.color};
            ">
            </p>
            <div style="
              flex: 1;
              display: flex;
              justify-content: space-between;
            ">
              <p style="
                font-weight: normal;
                color: #666666;
              ">
                ${item.seriesName}
              </p>
              <p style="
                margin-left: 30px;
                color: #121314;
                font-weight: bolder;
              ">
                ${item.value}
              </p>
            </div>
          </div>`;
    });
  } else {
    text = `<div style="font-weight: bolder; color: rgba(18, 19, 20, 1);">
        <p style="">${params.name}</p>
        <div style="
        display: flex;
        align-items: center;
        margin-top: 6px;
        padding: 6px;
        border-radius: 4px;
        background: #ffffff;
      ">
          <p style="
            width: 8px;
            height: 8px;
            margin-right: 5px;
            border-radius: 4px;
            background: ${params.color};
          ">
          </p>
          <div style="
            flex: 1;
            display: flex;
            justify-content: space-between;
          ">
            <p style="
              font-weight: normal;
              color: #666666;
            ">
              数值
            </p>
            <p style="
              margin-left: 30px;
              color: #121314;
              font-weight: bolder;
            ">
              ${params.value}
            </p>
          </div>
        </div>
      </div>

      <div style="font-weight: bolder; color: rgba(18, 19, 20, 1);">
        <div style="
          display: flex;
          align-items: center;
          margin-top: 6px;
          padding: 6px;
          border-radius: 4px;
          background: #ffffff;
        ">
            <p style="
              width: 8px;
              height: 8px;
              margin-right: 5px;
              border-radius: 4px;
              background: ${params.color};
            ">
            </p>
            <div style="
              flex: 1;
              display: flex;
              justify-content: space-between;
            ">
              <p style="
                font-weight: normal;
                color: #666666;
              ">
                ${params.seriesName}
              </p>
              <p style="
                margin-left: 30px;
                color: #121314;
                font-weight: bolder;
              ">
                ${params.percent}%
              </p>
            </div>
          </div>
        </div>`;
  }
  return `<div style="
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(4px);
      filter: blur(4px);
      border-radius: 3px;
      z-index: 9;
    "></div>
    <div style="
      position: relative;
      z-index: 9;
    ">${text}</div>`;
};

/**
 * 根据后端返回的 Map 转换为需要的数据
 */
export const formatEchartsData = (params: any) => {
  const resMap = new Map(Object.entries(params));
  const date: Array<string> = [];
  const data: Array<{name: string; data: any}> = [];
  resMap.forEach((v: any, k: string) => {
    date.push(k);
    const valueMap = new Map(Object.entries(v));
    valueMap.forEach((vv: any, vk: string) => {
      const has = data.find((item) => item.name === vk);
      if (has) {
        has.data.push(vv?.value ?? vv);
      } else {
        data.push({name: vk, data: [vv?.value ?? vv]});
      }
    });
  });
  return {
    date,
    data,
  };
};

/**
 * 图表基础颜色
 */
export const chartColors = (index: number) => {
  const colors = ["#72AEFF", "#FFBD58", "#35D6D7", "#FA3AA6", "#9580FF", "#FCAA80", "#3F72FE", "#34D5D6"];
  return colors[index];
};
/**
 * 图表面积颜色
 */
export const areaColors = (index: number) => {
  const areas = [
    "rgba(58, 77, 233, 0.2)",
    "rgba(255, 189, 88, 0.2)",
    "rgba(53, 214, 215, 0.2)",
    "rgba(250, 58, 166, 0.2)",
    "rgba(149, 128, 255, 0.2)",
    "rgba(252, 170, 128, 0.2)",
    "rgba(63, 114, 254, 0.2)",
    "rgba(52, 213, 214, 0.2)",
  ];
  return areas[index];
};
