import { reactive } from "vue";
import Dexie from "dexie";
import dayjs from "dayjs";

import * as api from "./api";

const db = new Dexie("fund_db");
const head = "id,code,name,time,net";

const getCace = (code, name, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sheet = {
        [`${code}`]: head,
      };
      db.version(1).stores(sheet);
      db.open();
      console.log(db)
      let list = [];

      const data = await db[code].toArray();
      if(data.length){
          const { time } = data.at(-1);
          const today = dayjs().format("YYYYMMDD");
          const enddate = dayjs(date, "YYYY-MM-DD").format("YYYYMMDD");
          if (enddate === time||today===enddate) {
            list = data.map(({ time, net }) => [time, net]);
          }
      }
    //   else {
    //     const arr = await api.getThsFundHistory(code);
    //     list = arr;
    //     const diff = arr.filter(([itemTime, net]) => {
    //       const date1 = dayjs(date);
    //       const date2 = dayjs(itemTime, "YYYYMMDD");
    //       return date1.isBefore(date2, "day");
    //     });
    //     const count = await db[code].count();
    //     const history = diff.map(([time, net], id) => ({
    //       id: count + id + 1,
    //       code,
    //       name,
    //       time,
    //       net,
    //     }));
    //     db[code].bulkPut(history);
    //   }
      resolve(list);
    } catch (error) {
      console.log(error);
      resolve([]);
    }
  });
};

export const fund = reactive({
  data: [],
  async getData({ code, name, enddate }) {
    const list = await getCace(code, name, enddate);
    if (list.length) {
      this.data = list;
    } else {
      const data = await api.getThsFundHistory(code);
      this.data = data;
      const history = data.map(([time, net], id) => ({
        id,
        code,
        name,
        time,
        net,
      }));
      db[code].bulkAdd(history);
    }
    db.close()
  },
});
