import { z } from "zod";

export const abilitySchema = z.object({
    repeat: z.boolean(),
    schedule: z.enum(['hourly', 'daily', 'weekly']).optional(),
    webhookUrl: z.string().url().optional(),
    characterId: z.string().min(1, "Character is required"),
    webhook: z.any().optional(),
  }).refine((data) => {
    if (data.repeat && !data.schedule) {
      return false;
    }
    return true;
  }, {
    message: "Schedule is required when repeat is enabled",
    path: ["schedule"],
  });