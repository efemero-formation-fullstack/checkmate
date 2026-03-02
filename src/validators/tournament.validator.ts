import z from "zod";

export const create_tournament_validator = z
  .object({
    name: z.string(),
    location: z.string().nullish(),
    min_players: z.int().min(2).max(32),
    max_players: z.int().min(2).max(32),
    min_elo: z.int().min(0).max(3000).nullish(),
    max_elo: z.int().min(0).max(3000).nullish(),
    categories: z.string().array().min(1),
    women_only: z.boolean().prefault(false),
    end_registration_date: z.iso.date(),
  })
  .refine(
    (t) => t.min_players <= t.max_players,
    `max_player must be greater or equal than min_player`,
  )
  .refine(
    (t) => (t.min_elo && t.max_elo ? t.min_elo <= t.max_elo : true),
    `max_elo must be greater or equal than min_elo`,
  )
  .superRefine((t, ctx) => {
    const date = new Date();
    date.setDate(date.getDate() + t.min_players);
    if (new Date(t.end_registration_date) <= date)
      ctx.addIssue({
        code: "custom",
        message: `The end registration date must be greater than now + min_player (${t.min_players}) days (${date.toISOString().substring(0, 10)})`,
        input: t.end_registration_date,
      });
  });

export const update_tournament_validator = z.object({});
