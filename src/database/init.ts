import { hash } from "@bronti/argon2";
import "dotenv/config";
import console from "node:console";
import process from "node:process";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Gender, Player, PlayerRole } from "../entities/index.ts";
import players from "./checkmate_players.json" with { type: "json" };

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  dropSchema: true,
  logging: process.env.DEV.toLowerCase() === "true",
  entities: [Player],
  migrations: [],
  subscribers: [],
});

try {
  const ds = await AppDataSource.initialize();

  // Run all the operations inside a transaction
  await ds.transaction(async (em) => {
    // insert mister Checkmate as admin
    const mr_checkmate = Player.create({
      nickname: "MrCheckmate",
      email: "chess_m@st.er",
      password: hash(process.env.ADMIN_PASSWORD),
      elo: 2851,
      birth_date: "1963-04-13",
      gender: Gender.MALE,
      role: PlayerRole.ADMIN,
    });
    await em.save(mr_checkmate);

    // insert players from json (1000 players from https://mockaroo.com)
    let player;
    for (player of players) {
      player.role = PlayerRole.PLAYER;
      player = Player.create(player);
      player = await em.save(player);
    }
  });
} catch (e) {
  console.log(e);
} finally {
  AppDataSource.destroy();
}
