import { signJWT, validateJWT } from "@cross/jwt";
import console from "node:console";
import process from "node:process";
import { Player } from "../entities/index.ts";

export async function generateToken(player: Player) {
  const payload = {
    id: player.id,
    role: player.role,
  };
  console.log(payload);

  const token = await signJWT(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  console.log(token);
  return token;
}

export async function decodeToken(token) {
  return await validateJWT(token, process.env.JWT_SECRET);
}
