import "reflect-metadata";
import { DataSource } from "typeorm";
import { Mate } from "./entities/index.ts";
import process from "node:process";

console.log(process.env.DEV);
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: process.env.DEV.toLowerCase() === "true",
  dropSchema: process.env.DEV.toLowerCase() === "true",
  logging: process.env.DEV.toLowerCase() === "true",
  entities: [Mate],
  migrations: [],
  subscribers: [],
});
