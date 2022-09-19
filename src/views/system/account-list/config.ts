import {ILTable} from "@/components/l-table/interface";
import {getAccountList} from "@/api/common/system";

export const tableConfig: ILTable = {
  request: getAccountList,
  title: "用户列表",
  search: {
    data: {},
    forms: [
      {
        type: "input",
        label: "用户信息",
        field: "keyword",
      },
      {
        type: "input",
        label: "用户地区",
        field: "area",
      },
      {
        type: "hidden",
        label: "用户地区",
        field: "area",
      },
      {
        label: "性别",
        field: "sex",
        type: "select",
        options: [
          {
            label: "男",
            value: 1,
          },
          {
            label: "女",
            value: 2,
          },
          {
            label: "未知",
            value: 0,
          },
        ],
      },
      {
        label: "状态",
        field: "status",
        type: "select",
        options: [
          {
            label: "启用",
            value: 1,
          },
          {
            label: "禁用",
            value: 0,
          },
        ],
      },
      {
        label: "注册时间",
        type: "daterange",
        field: "register_time",
      },
      {
        type: "input",
        label: "手机号",
        field: "phone",
      },
    ],
  },
  toolbar: {
    leftOperates: [{name: "批量启用"}, {name: "批量禁用", split: true}, {name: "导出列表"}],
    rightOperates: [{name: "新建用户", others: {type: "primary"}}],
  },
  table: {
    data: [],
    selectedRows: [],
    columns: [
      {
        type: "slot",
        title: "用户信息",
        dataIndex: "user",
        width: 220,
      },
      {
        title: "姓名",
        dataIndex: "name",
      },
      {
        title: "性别",
        dataIndex: "sex",
      },
      {
        title: "生日",
        dataIndex: "borthday",
      },
      {
        title: "地区",
        dataIndex: "area",
        width: 150,
        others: {
          ellipsis: true,
          tooltip: true,
        },
      },
      {
        title: "手机号",
        dataIndex: "phone",
        width: 130,
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
