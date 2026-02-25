import { Player } from "../entities/index.ts";

export function login(nickname: string, password: string): Player {
  const player = await Player.findOneBy({ nickname });
  return player;
}

export function genpw(length: number = 12): string {
  const char =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const ind = Math.floor(Math.random() * char.length);
    password += char[ind];
  }
  return password;
}
