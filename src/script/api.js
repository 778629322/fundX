import http from "./http.js";
//node 基金详情
export async function getFundInfo(code) {
	const url = `http://localhost:3000/getThsFundInfo?code=${code}`;
	const res = await http.get(url);
	return res.data;
}
export async function getFuzzyList(keyword) {
	return new Promise((resolve) => {
		const callFun = "markQuery";
		const url = `https://news.10jqka.com.cn/public/index_keyboard_${keyword}_stock,hk,fund,usa,uk_5_1_${callFun}.html`;
		const script = document.createElement("script");
		script.async = true;
		script.src = url;
		window[callFun] = function (data) {
			resolve(data);
		};
		script.onload = () => {
			script.parentNode.removeChild(script);
		};
		const head = document.head;
		head.insertBefore(script, head.firstChild);
	});
}
//基金历史行情
export function getThsFundHistory(code) {
	return new Promise((resolve) => {
		const url = `https://fund.10jqka.com.cn/${code}/json/jsonljjz.json`;
		const script = document.createElement("script");
		script.async = true;
		script.src = url;
		script.onload = () => {
			const key = `ljjz_${code}`;
			resolve(window[key]);
			script.parentNode.removeChild(script);
		};
		const head = document.head;
		head.insertBefore(script, head.firstChild);
	});
}
