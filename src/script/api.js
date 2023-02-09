import http from "./http.js";
//node 基金详情
export async function getFundInfo(code) {
  const url = `http://localhost:3000/getThsFundInfo?code=${code}`;
  const res = await http.get(url);
  return res.data;
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
export function queryInfo(code, type) {
  ["getThsFundInfo", "", ""][type](code);
}
