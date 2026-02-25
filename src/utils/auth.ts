import { hash, verify } from "@bronti/argon2";
import bcrypt from "bcryptjs";
import { Player } from "../entities/index.ts";

// Verify that the login (nickname or email) has the corresponding password hash.
// The default hash method is argon2, but some old passwords use bcrypt.
// When an old password hash method is used, we generate a new one, and save it.
export async function login(login: string, password: string): Promise<Player> {
  const player = await Player.findOneBy([
    { nickname: login },
    { email: login },
  ]);
  if (!player) return null;
  if (!verifyArgon2(password, player.password)) {
    // test bcrypt
    if (!verifyBcrypt(password, player.password)) {
      return null;
    }
    // re-hash with argon2
    player.password = hash(password);
    await player.save();
  }

  return player;
}

function verifyArgon2(password, hash): boolean {
  try {
    if (!verify(password, hash)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

function verifyBcrypt(password, hash): boolean {
  try {
    if (!bcrypt.compareSync(password, hash)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
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
