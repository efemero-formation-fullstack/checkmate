import { signJWT, validateJWT } from "@cross/jwt";
import createError from "http-errors";
import process from "node:process";
import { Player } from "../entities/index.ts";

export async function generateToken(player: Player) {
  const payload = {
    id: player.id,
    role: player.role,
  };

  const token = await signJWT(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return token;
}

export async function decodeToken(token) {
  const payload = await validateJWT(token, process.env.JWT_SECRET);
  const outdated = payload.exp * 1000 < Date.now();
  if (outdated) {
    throw createError(401, "outdated token");
  }
  return payload;
}
