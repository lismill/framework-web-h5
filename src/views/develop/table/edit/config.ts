export const config = {
  columns: [
    {
      title: "#",
      width: 40,
      align: "center",
    },
    // {
    //     type: "text",
    //     title: "文本展示",
    //     dataIndex: "text",
    //     width: 90,
    // },
    {
      type: "input",
      title: "名称",
      dataIndex: "input",
      width: 150,
      rules: [{required: true, message: "请输入名称"}],
    },
    {
      type: "switch",
      title: "状态",
      dataIndex: "switch",
      width: 50,
    },
    {
      type: "select",
      title: "答案",
      dataIndex: "select",
      width: 130,
      options: [
        {label: "A", value: "a"},
        {label: "B", value: "b"},
        {label: "C", value: "c"},
        {label: "D", value: "d"},
      ],
      rules: [{required: true, message: "请输入名称"}],
      others: {},
    },
    {
      type: "date",
      title: "日期",
      dataIndex: "date",
      width: 130,
    },
    {
      type: "daterange",
      title: "日期范围",
      dataIndex: "daterange",
      width: 220,
    },
    {
      type: "slot",
      title: "自定义插槽",
      dataIndex: "custom",
      width: 100,
    },
  ],
  data: [
    {
      text: "文本展示",
      input: "四控、三管",
      switch: false,
      select: "a",
      date: "2022-08-19",
      daterange: ["2022-08-18", "2022-08-19"],
    },
  ],
  others: {
    title: "添加数据",
  },
};
