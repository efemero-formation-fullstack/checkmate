import z from "zod";

export const login_validator = z.object({
  login: z.string(),
  password: z.string(),
});
