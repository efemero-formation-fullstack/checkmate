import process from "node:process";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Player } from "./entities/index.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  logging: process.env.DEV.toLowerCase() === "true",
  entities: [Player],
  migrations: [],
  subscribers: [],
});
