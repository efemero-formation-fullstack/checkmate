import { signJWT, validateJWT } from "@cross/jwt";
import { Player } from "../entities/index.ts";
import process from "node:process";

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
  return await validateJWT(token, process.env.JWT_SECRET);
}
