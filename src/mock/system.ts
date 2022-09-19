import {Random} from "mockjs";

export default [
  {
    url: "/account/list",
    method: "get",
    timeout: 0,
    response: () => {
      const rows: any = [];
      for (let i = 0; i < 10; i++) {
        rows.push({
          id: i,
          image: "https://i.postimg.cc/8kq8ZyL2/lean.png",
          nick_name: Random.name(),
          name: Random.cname(),
          "sex|1": ["男", "女"],
          borthday: Random.datetime("yyyy-MM-dd"),
          area: Random.county(true),
          "phone|10000000000-19999999999": 13525855263,
          real_name: Random.boolean() ? "已实名" : "未实名",
          "status|1": ["启用", "禁用"],
        });
      }

      return {
        code: 200,
        msg: "ok",
        data: {
          rows,
          total: Math.ceil(Math.random() * 1000),
        },
      };
    },
  },
  {
    url: "/information/list",
    method: "get",
    timeout: 0,
    response: () => {
      const rows: any = [];
      for (let i = 0; i < 10; i++) {
        rows.push({
          id: i,
          image: "https://i.postimg.cc/8kq8ZyL2/lean.png",
          text: Random.csentence(3, 5),
          "classify|1": ["娱乐信息", "国家政务", "民生生活"],
          create_time: Random.datetime("yyyy-MM-dd"),
          "status|1": ["启用", "禁用"],
        });
      }

      return {
        code: 200,
        msg: "ok",
        data: {
          rows,
          total: 21,
        },
      };
    },
  },
];
