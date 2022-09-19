import {ILTable} from "@/components/l-table/interface";
import {getInformation} from "@/api/common/system";

export const tableConfig: ILTable = {
  request: getInformation,
  title: "角色列表",
  search: {
    data: {},
    forms: [
      {
        label: "角色信息",
        field: "keyword",
      },
      {
        label: "角色分类",
        field: "area",
      },
      {
        label: "创建时间",
        field: "create_time",
        type: "daterange",
      },
    ],
  },
  status: {
    prop: "status",
    items: [
      {
        name: "全部",
        value: "0",
      },
      {
        name: "启用",
        value: "1",
        total: 689,
      },
      {
        name: "禁用",
        value: "2",
        total: 26,
      },
    ],
  },
  toolbar: {
    rightOperates: [{name: "新建角色", others: {type: "primary"}}],
  },
  table: {
    data: [],
    selectedRows: [],

    columns: [
      {
        type: "slot",
        title: "角色信息",
        dataIndex: "information",
        width: 220,
      },
      {
        title: "角色分类",
        dataIndex: "classify",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
      },
      {
        title: "状态",
        dataIndex: "status",
      },
      {
        type: "slot",
        title: "操作",
        dataIndex: "operate",
      },
    ],
  },
  footer: {
    pagination: {
      total: 0,
      page: 1,
      size: 10,
    },
  },
};
