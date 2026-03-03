import { hash } from "@bronti/argon2";
import bcrypt from "bcryptjs";
import "dotenv/config";
import console from "node:console";
import process from "node:process";
import "reflect-metadata";
import { AppDataSource } from "../data-source.ts";
import {
  Category,
  Gender,
  Player,
  PlayerRole,
  Tournament,
  TournamentStatus,
} from "../entities/index.ts";
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

    const categories = [];
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
      categories.push(await em.save(category));
    }

    // insert players from json (1000 players from https://mockaroo.com)
    let player;
    for (player of players) {
      player.role = PlayerRole.PLAYER;
      player = Player.create(player);
      player = await em.save(player);
    }
    // insert a test player with known password
    const test_user1 = Player.create({
      nickname: "test_player1",
      email: "just@yo.lo",
      password: hash("test_password"),
      elo: 400,
      birth_date: "1980-02-22",
      gender: Gender.MALE,
      role: PlayerRole.PLAYER,
    });
    await em.save(test_user1);
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

    let test_user3 = Player.create({
      nickname: "test_player3",
      email: "just3@yo.lo",
      password: hash("test_password"),
      elo: 400,
      birth_date: "1980-02-22",
      gender: Gender.FEMALE,
      role: PlayerRole.PLAYER,
    });
    test_user3 = await em.save(test_user3);
    let test_user4 = Player.create({
      nickname: "test_player4",
      email: "just4@yo.lo",
      password: hash("test_password"),
      elo: 400,
      birth_date: "1980-02-22",
      gender: Gender.FEMALE,
      role: PlayerRole.PLAYER,
    });
    test_user4 = await em.save(test_user4);
    let test_user5 = Player.create({
      nickname: "test_player5",
      email: "just5@yo.lo",
      password: hash("test_password"),
      elo: 1400,
      birth_date: "1980-02-22",
      gender: Gender.OTHER,
      role: PlayerRole.PLAYER,
    });
    test_user5 = test_user5 = await em.save(test_user5);
    let test_user6 = Player.create({
      nickname: "test_player6",
      email: "just6@yo.lo",
      password: hash("test_password"),
      birth_date: "1980-02-22",
      gender: Gender.FEMALE,
      role: PlayerRole.PLAYER,
    });
    test_user6 = await em.save(test_user6);
    const test_tournament: Tournament = Tournament.create({
      name: "Test Tournament Challenge Opens Master",
      location: "Nowhere",
      min_players: 2,
      max_players: 3,
      min_elo: 1000,
      max_elo: 1600,
      categories: categories.filter((c) =>
        ["senior", "veteran"].includes(c.name),
      ),
      status: TournamentStatus.PENDING,
      women_only: true,
      end_registration_date: new Date(),
      players: [test_user3, test_user4],
    });
    await em.save(test_tournament, {
      relations: { categories: true, players: true },
    });
  });
} catch (e) {
  console.log(e);
} finally {
  AppDataSource.destroy();
}
