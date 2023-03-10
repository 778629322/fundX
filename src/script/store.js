import { reactive } from "vue";
import Dexie from "dexie";

import * as api from "./api";

class DB {
	constructor() {
		const db = new Dexie("fund_db");
		const storeName = "code_list";
		const head = "++code,name,status,type";
		const sheet = {
			[storeName]: head,
		};
		db.version(1).stores(sheet);
		db.open();
		this.db = db[storeName];
	}
	async get(code = "") {
		const list = await this.db
			.filter((item) => {
				if (code) return item.code == code;
				return item.code;
			})
			.toArray();
		return list;
	}
	put(params) {
		this.db.bulkPut(params);
	}
	set(key, params) {
		this.db.update(key, params);
	}
	del(key) {
		this.db.delete(key);
	}
}

export const dynamicDB = new DB();

// const getCace = (code, name, date) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const sheet = {
// 				code_list: head,
// 			};
// 			db.version(1).stores(sheet);
// 			db.open();
// 			console.log(db);
// 			let list = [];

// 			const data = await db[code].toArray();
// 			if (data.length) {
// 				const { time } = data.at(-1);
// 				const today = dayjs().format("YYYYMMDD");
// 				const enddate = dayjs(date, "YYYY-MM-DD").format("YYYYMMDD");
// 				if (enddate === time || today === enddate) {
// 					list = data.map(({ time, net }) => [time, net]);
// 				}
// 			}
// 			//   else {
// 			//     const arr = await api.getThsFundHistory(code);
// 			//     list = arr;
// 			//     const diff = arr.filter(([itemTime, net]) => {
// 			//       const date1 = dayjs(date);
// 			//       const date2 = dayjs(itemTime, "YYYYMMDD");
// 			//       return date1.isBefore(date2, "day");
// 			//     });
// 			//     const count = await db[code].count();
// 			//     const history = diff.map(([time, net], id) => ({
// 			//       id: count + id + 1,
// 			//       code,
// 			//       name,
// 			//       time,
// 			//       net,
// 			//     }));
// 			//     db[code].bulkPut(history);
// 			//   }
// 			resolve(list);
// 		} catch (error) {
// 			console.log(error);
// 			resolve([]);
// 		}
// 	});
// };

export const fundHistory = reactive({
	cache: {},
	type: "",
	data: [],
	async getData({ code, type }) {
		this.type = type;
		const isCache = this.cache[code];
		if (isCache) {
			this.data = isCache;
			return;
		}
		const data = await api.getThsFundHistory(code);
		this.cache[code] = data;
		this.data = data;
	},
});

export const fundInfo = reactive({
	list: [],
	async getData({ code }, { upCache = false }) {
		// console.log(this.list);
		// this.list.push(code);
		if (!upCache) {
			const isexist = this.list.filter((item) => item.code == code);
			if (isexist.length) {
				return isexist;
			}
		}
		const data = await api.getFundInfo(code);
		this.list.push(data[0]);
		return data;
	},
});
