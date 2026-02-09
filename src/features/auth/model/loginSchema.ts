import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Please enter your username.")
    .min(4, "Username must be at least 4 characters."),
  password: z
    .string()
    .min(1, "Please enter your password.")
    .min(4, "Password must be at least 4 characters."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
