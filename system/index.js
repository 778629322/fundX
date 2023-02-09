import express from "express";

import * as api from "./api.js";
const app = express();
var router = express.Router();

router.get("/getThsFundInfo", async function (req, res) {
  const data = await api.getThsFundInfo(req.query.code);
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ data, status: 1 });
});
app.use(router);
app.listen(3000, () => {
  console.log("服务已启动");
});
