import http from "./http.js";

export async function getThsFundInfo(code) {
  const url = `http://fund.10jqka.com.cn/data/client/myfund/${code}`;
  const res = await http.get(url);
  return res.data;
}
