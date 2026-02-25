import z from "zod";
import { Gender, PlayerRole } from "../entities/index.ts";

export const create_player_validator = z.object({
  nickname: z.string().min(3).max(16),
  email: z.email(),
  elo: z.nullish(z.int().min(0).max(3000)),
  birth_date: z.iso.date(),
  gender: z.enum(Gender),
  role: z.nullish(z.enum(PlayerRole)).prefault(PlayerRole.PLAYER),
});

export const update_player_validator = z.object({
  nickname: z.string().min(3).max(16).nullish(),
  email: z.email().nullish(),
  elo: z.nullish(z.int().min(0).max(3000)).nullish(),
  birth_date: z.iso.date().nullish(),
  gender: z.enum(Gender).nullish(),
});
