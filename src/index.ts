import "dotenv/config";
import express from "express";
import console from "node:console";
import path from "node:path";
import { AppDataSource } from "./data-source.ts";
import router from "./routers/index.ts";
import process from "node:process";
import { STATUS_CODES } from "node:http";

try {
  const ds = await AppDataSource.initialize();
} catch (e) {
  console.log(e);
}
const app = express();
const port = process.env.APP_PORT;

app.use("/", router);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
