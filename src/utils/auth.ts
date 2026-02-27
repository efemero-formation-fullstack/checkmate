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
  console.log(login, password, player);
  // login does not correspond to any player in the DB
  if (!player) return null;

  // verify the password using argon2
  if (!verifyArgon2(password, player.password)) {
    // if this is not argon2, test bcrypt
    if (!verifyBcrypt(password, player.password)) {
      // not bcrypt valid, nor argon2 -> bad password
      return null;
    }
    // bcrypt valid -> re-hash with argon2 and save
    player.password = hash(password);
    await player.save();
  }

  return player;
}

// Verify a password against a hash using argon2.
// Return false if it don't match, or if the hash is not a valid argon2 hash.
// We loose the distinction here to simplify the call.
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

// Verify a password against a hash using bcrypt.
// Return false if it don't match, or if the hash is not a valid bcrypt hash.
// We loose the distinction here to simplify the call.
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
