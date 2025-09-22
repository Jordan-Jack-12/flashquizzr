import { z } from "zod";

export const paddleCustomDataSchema = z.object({
  profile_id: z.string(),
  plan: z.string(),
});
