import { z } from "zod";

export enum ActivityType {
  REPLY_SENT = "REPLY_SENT",
  WORKER_CREATED = "WORKER_CREATED",
  CAMPAIGN_CREATED = "CAMPAIGN_CREATED",
  AUTOPILOT_ACTIVATED = "AUTOPILOT_ACTIVATED",
  AUTOPILOT_DEACTIVATED = "AUTOPILOT_DEACTIVATED",
  CAMPAIGN_UPDATED = "CAMPAIGN_UPDATED",
  WORKER_UPDATED = "WORKER_UPDATED",
}

export const CreateActivityLogSchema = z.object({
  ownerId: z.string(),
  workerId: z.string().optional(),
  storeId: z.string(),
  type: z.nativeEnum(ActivityType),
  message: z.string().min(1, "Message cannot be empty"),
  status: z.enum(["Success", "Failed"]),
});

export type CreateActivityLogRequest = z.infer<typeof CreateActivityLogSchema>;