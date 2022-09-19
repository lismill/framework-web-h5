import {ILForm} from "@/components/l-form/interface";
import {getSearchRemoteList} from "@/api/common/table";

export const config: ILForm = {
  form: {
    title: "新建账号",
    disabled: false,
    operatesAlign: "center",
    operates: {
      left: [
        {name: "左侧按钮", others: {type: "primary", status: "success"}},
        {name: "禁用表单", others: {type: "primary", status: "warning"}},
        {name: "启用表单", others: {type: "outline", status: "success"}},
      ],
      centerShowResetButton: true,
      centerShowSubmitButton: true,
      // center: [{name: "中间按钮", others: {type: "primary"}}],
      right: [{name: "右侧按钮", others: {type: "primary", status: "danger"}}],
    },
    data: {
      switch: false,
      radio: "1",
      checkbox: [],
      upload: [{name: "", url: "", response: {status: "done"}}],
    },
    others: {},
  },
  sections: [
    {
      title: "基础信息",
      items: [
        {
          type: "text",
          label: "文本",
          name: "text",
          size: "large",
          others: {},
        },
        {
          type: "switch",
          label: "开关",
          name: "switch",
          others: {},
        },
        {
          type: "number",
          label: "数字",
          name: "number",
          size: "mini",
          rules: [{required: true, message: "请输入数字"}],
          info: "这是一段自定义文案 size: mini",
          tooltip: "当某个页面<br />需要向用户显示警告的信息时<br />当某个页面需要向用户显示警告的信息时",
          others: {
            addonAfter: "元",
          },
        },
        {
          type: "select",
          label: "城市",
          name: "city",
          rules: [{required: true, message: "请选择城市"}],
          info: "这是一段自定义文案 size: small",
          options: [
            {key: "大", value: "big"},
            {key: "中", value: "medium"},
            {key: "小", value: "small"},
          ],
          others: {
            // 自定义下拉框的label/value，默认 label/value
            fieldNames: {
              label: "key",
              value: "value",
            },
          },
        },
        {
          type: "select-search",
          label: "远程搜索",
          name: "selectremote",
          rules: [{required: true, message: "请选择远程搜索"}],
          info: "这是一段自定义文案 size: small",
          options: [],
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
          type: "cascader",
          label: "级联菜单",
          name: "cascader",
          info: "这是一段自定义文案 size: small",
          options: [
            {
              value: "浙江省",
              label: "浙江省",
              children: [
                {
                  value: "杭州市",
                  label: "杭州市",
                  children: [
                    {
                      value: "西湖区",
                      label: "西湖区",
                    },
                  ],
                },
              ],
            },
            {
              value: "江苏省",
              label: "江苏省",
              children: [
                {
                  value: "南京市",
                  label: "南京市",
                  children: [
                    {
                      value: "鼓楼区",
                      label: "鼓楼区",
                    },
                  ],
                },
              ],
            },
          ],
          others: {},
        },
        {
          type: "input",
          label: "姓名",
          name: "name",
          size: "medium",
          rules: [{required: true, message: "请输入姓名"}],
          info: "这是一段自定义文案 size: medium",
          tooltip: "当某个页面<br />需要向用户显示警告的信息时<br />当某个页面需要向用户显示警告的信息时",
          others: {},
        },
        {
          type: "textarea",
          label: "多行文本",
          name: "textarea",
          size: "large",
          info: "这是一段自定义文案 size: large",
          rules: [{required: true, message: "请输入多行文本"}],
          others: {},
        },
        {
          type: "upload",
          label: "文件上传",
          name: "upload",
          size: "large",
          rules: [{required: true, message: "请上传文件"}],
          others: {
            limit: 2,
          },
        },
      ],
    },
    {
      title: "详细信息",
      items: [
        {
          type: "radio",
          label: "性别",
          name: "radio",
          options: [
            {label: "男", value: "1"},
            {label: "女", value: "2"},
            {label: "未知", value: "0"},
          ],
          rules: [{required: true, message: "请选择性别"}],
        },
        {
          type: "checkbox",
          label: "城市",
          name: "checkbox",
          options: [
            {label: "北京", value: "beijing"},
            {label: "上海", value: "shanghai"},
            {label: "广州", value: "guangzhou"},
            {label: "深圳", value: "shenzhen"},
          ],
          others: {},
        },
        {type: "time", label: "时间", name: "time", others: {}},
        {
          type: "date",
          label: "日期",
          name: "date",
          others: {picker: "year"},
        },
        {type: "daterange", label: "活动时间", name: "daterange", others: {}},
        {type: "daterange", label: "活动时间范围", name: "rangeTime", others: {showTime: true}},
        {
          type: "slot",
          label: "自定义插槽",
          name: "slotName",
          rules: [{required: true, message: "请输入自定义插槽"}],
        },
        {
          type: "editor",
          label: "富文本编辑器",
          name: "editor",
          size: "large",
          rules: [{required: true, message: "请输入自定义插槽"}],
          others: {},
        },
      ],
    },
  ],
};
