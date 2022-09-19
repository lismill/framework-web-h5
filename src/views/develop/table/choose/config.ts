import {getTableList} from "@/api/common/table";
import {ILTable} from "@/components/l-table/interface";
import {ILTableChoose} from "@/components/l-table-choose/interface";

/**
 * 配置弹出选择表格
 */
export const modalConfig: ILTableChoose = {
  request: getTableList,
  modal: {
    visible: false,
    others: {
      title: "添加用户",
      width: 1100,
    },
  },
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
    ],
  },
  status: {
    prop: "status",
    items: [
      {name: "全部", value: "全部"},
      {name: "上架", value: "上架"},
    ],
  },
  table: {
    data: [],
    selectedType: "checkbox",
    selectedRows: [],
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        width: 460,
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
    ],
    others: {
      size: "large",
    },
  },
  footer: {
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

export const chooseConfig: ILTable = {
  table: {
    data: [],
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        width: 460,
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
        dataIndex: "operate",
        title: "操作",
        width: 160,
      },
    ],
  },
};
