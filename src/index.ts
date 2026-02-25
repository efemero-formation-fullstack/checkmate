import "dotenv/config";
import express from "express";
import morgan from "morgan";
import console from "node:console";
import process from "node:process";
import { AppDataSource } from "./data-source.ts";
import router from "./routers/index.ts";

try {
  await AppDataSource.initialize();
} catch (e) {
  console.log(e);
}
const app = express();
const port = process.env.APP_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
