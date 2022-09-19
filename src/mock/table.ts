import {Random} from "mockjs";

export default [
  {
    url: "/api/getTableList",
    method: "get",
    timeout: 0,
    response: () => {
      const rows: any = [];
      for (let i = 0; i < 10; i++) {
        rows.push({
          id: i,
          name: `${Random.name()} - 还提供了一个全局配置方法，在调用前提前配置，全局一次生效。还提供了一个全局配置方法，在调用前提前配置，全局一次生效。`,
          date: Random.date(),
          city: `${Random.province()}-${Random.city()}-${Random.county()}`,
          guid: Random.guid(),
        });
      }
      return {
        code: 200,
        msg: "ok",
        data: {
          rows,
          total: Random.integer(111, 1999),
        },
      };
    },
  },
  {
    url: "/api/getDictList",
    method: "get",
    timeout: 0,
    response: () => {
      const rows: any = [];
      for (let i = 0; i < 10; i++) {
        rows.push({
          id: Random.guid(),
          name: Random.name(),
          code: Random.name(),
          "status|1": ["1", "2"],
          remark: Random.name(),
          create_time: Random.date(),
        });
      }
      return {
        code: 200,
        msg: "ok",
        data: {
          rows,
          total: Random.integer(111, 1999),
        },
      };
    },
  },
  {
    url: "/api/getSearchRemoteList",
    method: "get",
    timeout: 0,
    response: () => {
      const rows: any = [];
      for (let i = 0; i < 10; i++) {
        rows.push({
          key: Random.name(),
          value: Random.guid(),
        });
      }
      return {
        code: 200,
        msg: "ok",
        data: {
          rows,
          total: Random.integer(111, 1999),
        },
      };
    },
  },
];
