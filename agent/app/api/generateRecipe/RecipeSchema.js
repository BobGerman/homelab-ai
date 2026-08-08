import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
    }),
  ),
  steps: z.array(z.string()),
});