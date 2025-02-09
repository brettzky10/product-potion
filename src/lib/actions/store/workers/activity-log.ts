"use server";

import {
  CreateActivityLogRequest,
  CreateActivityLogSchema,
} from "@/lib/schemas/logging-notification.schema";
import { Result } from "@/lib/types";
import { activity } from "@prisma/client";

import prismadb from "@/lib/db/prismadb";
import { createClient } from "@/lib/supabase/supabase-server";

export async function createActivityLog(
  activity: CreateActivityLogRequest,
): Promise<Result<activity>> {
  try {
    const currentUser = await createClient();
    if (!currentUser) {
      return {
        type: "error",
        message: "Authentication required. Please log in to continue.",
        data: null,
      };
    }

    const validatedActivityData = CreateActivityLogSchema.safeParse(activity);

    if (!validatedActivityData.success) {
      return {
        type: "error",
        message: "Invalid activity log data provided.",
        data: null,
      };
    }

    const payload = validatedActivityData.data;

    const createdActivity = await prismadb.activity.create({
      data: {
        ownerId: payload.ownerId,
        storeId: payload.storeId,
        workerId: payload?.workerId,
        type: payload.type,
        message: payload.message,
        status: payload.status,
      },
    });

    return {
      type: "success",
      message: "Activity log entry created successfully.",
      data: createdActivity,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { type: "error", message: error.message, data: null };
    } else {
      return {
        type: "error",
        message: "An error occurred while creating the activity log entry.",
        data: null,
      };
    }
  }
}

/* export async function getActivityLog(
  storeId?: string,
): Promise<Result<activity[]>> {
  try {
    const currentUser = await createClient();
    if (!currentUser) {
      return {
        type: "error",
        message: "Authentication required. Please log in to continue.",
        data: null,
      };
    }
    const activityLogs = await prismadb.activity.findMany({
      where: {
        ownerId: currentUser.id,
        ...(storeId ? { storeId } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      type: "success",
      message: "Activity logs retrieved successfully.",
      data: activityLogs,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { type: "error", message: error.message, data: null };
    } else {
      return {
        type: "error",
        message: "An error occurred while getting activity logs.",
        data: null,
      };
    }
  }
} */