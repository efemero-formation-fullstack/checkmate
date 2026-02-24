import z from "zod";
import { Gender } from "../entities/index.ts";

/**
 * Validateur pour la CRÉATION d'un concert.
 * Ici, on est strict : les données doivent être présentes et valides.
 */
export const create_player_validator = z.object({
  nickname: z.string().min(3).max(16),
  email: z.email(),
  birth_date: z.iso.date(),
  gender: z.enum(Gender),
  elo: z.nullish(z.int().min(0).max(3000)),
});
