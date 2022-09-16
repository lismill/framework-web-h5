import {Random} from "mockjs";

const data: any = [];
for (let i = 0; i < 10; i++) {
  data.push({
    name: Random.name(),
    date: Random.date(),
  });
}

export default [
  {
    url: "/test/list",
    method: "get",
    timeout: 1500,
    response: () => {
      return {
        code: 200,
        msg: "ok",
        data,
      };
    },
  },
];
