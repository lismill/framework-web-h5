import {getSearchRemoteList, getTableList} from "@/api/common/table";
import {ILTable} from "@/components/l-table/interface";

export const config: ILTable = {
  request: getTableList,
  title: "账号列表",
  search: {
    data: {
      status: "1",
    },
    forms: [
      {
        type: "input",
        field: "input",
        label: "文本框",
        others: {},
      },
      {
        type: "select",
        field: "city",
        label: "下拉框",
        options: [
          {label: "A", value: "a"},
          {label: "B", value: "b"},
          {label: "C", value: "c"},
        ],
        others: {a: 111},
      },
      {type: "date", field: "date", label: "日期", others: {}},
      {type: "daterange", field: "daterange", label: "日期范围", others: {}},
      {
        type: "select-search",
        label: "远程搜索",
        field: "selectremote",
        others: {
          // 远程搜索地址
          request: getSearchRemoteList,
          // 默认的选项数组
          fieldNames: {label: "key", value: "value"},
          // 自定义属性值
          defaultValue: {key: "深圳", value: "shenzhen"},
          // 默认展示的值，多用于编辑场景
          options: [{key: "北京", value: "beijing"}],
        },
      },
      {
        type: "slot",
        field: "slot",
        label: "插槽",
        others: {},
      },
    ],
  },
  status: {
    prop: "status",
    items: [
      {name: "未开始", value: "1"},
      {name: "进行中", value: "2"},
      {name: "已完成", value: "3", total: 999},
    ],
  },
  toolbar: {
    leftOperates: [
      {name: "隐藏按钮", others: {hidden: true}},
      {name: "批量上架", others: {}},
      {name: "批量下架", split: true, others: {}},
      {name: "导出列表", others: {}},
    ],
    rightOperates: [{name: "创建账号", others: {type: "primary"}}],
  },
  table: {
    data: [],
    selectedType: "checkbox",
    selectedRows: [],
    columns: [
      // {
      //     title: "#",
      //     width: 50,
      // },
      {
        type: "slot",
        title: "图片",
        dataIndex: "image",
        width: 220,
      },
      {
        title: "姓名",
        dataIndex: "name",
        width: 300,
        others: {
          ellipsis: true,
          tooltip: true,
        },
      },
      {
        title: "城市",
        dataIndex: "city",
      },
      {
        title: "日期",
        dataIndex: "date",
      },
      {
        type: "slot",
        title: "操作",
        dataIndex: "operate",
        width: 190,
      },
    ],
    others: {
      size: "large",
    },
  },
  footer: {
    operates: [
      {name: "批量开始", others: {type: "primary"}},
      {name: "批量删除", others: {type: "primary", status: "danger"}},
    ],
    pagination: {
      props: {
        page: "currentPge",
        size: "pageSize",
      },
      total: 0,
      page: 1,
      size: 10,
      pageSizes: [10, 20, 30, 50, 100],
      others: {},
    },
  },
};
