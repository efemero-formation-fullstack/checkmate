import { hash } from "@bronti/argon2";
import bcrypt from "bcryptjs";
import "dotenv/config";
import console from "node:console";
import process from "node:process";
import "reflect-metadata";
import { AppDataSource } from "../data-source.ts";
import { Category, Gender, Player, PlayerRole } from "../entities/index.ts";
import players from "./checkmate_players.json" with { type: "json" };

AppDataSource.setOptions({
  synchronize: true,
  dropSchema: true,
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

    // insert categories
    for (const c of [
      ["junior", 0, 17],
      ["senior", 18, 59],
      ["veteran", 60, 1000],
    ]) {
      const category = Category.create({
        name: c[0],
        min_age: c[1],
        max_age: c[2],
      });
      await em.save(category);
    }

    // insert players from json (1000 players from https://mockaroo.com)
    let player;
    for (player of players) {
      player.role = PlayerRole.PLAYER;
      player = Player.create(player);
      player = await em.save(player);
    }
    // insert a test player with known password
    const test_user = Player.create({
      nickname: "test_player",
      email: "just@yo.lo",
      password: hash("test_password"),
      elo: 400,
      birth_date: "1980-02-22",
      gender: Gender.MALE,
      role: PlayerRole.PLAYER,
    });
    await em.save(test_user);
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash("test_password", salt);
    // insert a test player with known password, but hashed as bcrypt
    const test_user2 = Player.create({
      nickname: "test_player2",
      email: "just2@yo.lo",
      password: password_hash,
      elo: 400,
      birth_date: "1980-02-22",
      gender: Gender.MALE,
      role: PlayerRole.PLAYER,
    });
    await em.save(test_user2);
  });
} catch (e) {
  console.log(e);
} finally {
  AppDataSource.destroy();
}
