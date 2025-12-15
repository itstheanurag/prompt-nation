"use server";

import { db } from "@/db";
import { savedPrompts, promptHistories } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq, desc, and } from "drizzle-orm";

export async function getSavedPrompts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return [];
  }

  const prompts = await db
    .select()
    .from(savedPrompts)
    .where(eq(savedPrompts.userId, session.user.id))
    .orderBy(desc(savedPrompts.createdAt));

  return prompts;
}

export async function savePrompt(data: {
  title: string;
  prompt: string;
  description?: string;
  type?: string;
  model?: string;
  result?: string;
  mediaUrl?: string;
  tags?: string[];
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const id = crypto.randomUUID();
    const now = new Date();

    await db.insert(savedPrompts).values({
      id,
      userId: session.user.id,
      title: data.title,
      description: data.description || data.prompt,
      prompt: data.prompt,
      type: data.type || "text",
      model: data.model,
      result: data.result,
      mediaUrl: data.mediaUrl,
      tags: data.tags || [],
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath("/dashboard/directory");
    revalidatePath("/dashboard/directory/saved");
    return { success: true, id };
  } catch (error) {
    console.error("Failed to save prompt:", error);
    return { success: false, error: "Failed to save prompt" };
  }
}

export async function updatePrompt(
  id: string,
  data: {
    title?: string;
    description?: string;
    prompt?: string;
    type?: string;
    model?: string;
    result?: string;
    mediaUrl?: string;
    tags?: string[];
    starred?: boolean;
  }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .update(savedPrompts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(eq(savedPrompts.id, id), eq(savedPrompts.userId, session.user.id))
      );

    revalidatePath("/dashboard/directory");
    revalidatePath("/dashboard/directory/saved");
    return { success: true };
  } catch (error) {
    console.error("Failed to update prompt:", error);
    return { success: false, error: "Failed to update prompt" };
  }
}

export async function toggleStarPrompt(id: string, starred: boolean) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .update(savedPrompts)
      .set({
        starred,
        updatedAt: new Date(),
      })
      .where(
        and(eq(savedPrompts.id, id), eq(savedPrompts.userId, session.user.id))
      );

    revalidatePath("/dashboard/directory");
    revalidatePath("/dashboard/directory/saved");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle star:", error);
    return { success: false, error: "Failed to toggle star" };
  }
}

export async function addToHistory(data: {
  prompt: string;
  type?: string;
  model?: string;
  result?: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const id = crypto.randomUUID();

    await db.insert(promptHistories).values({
      id,
      userId: session.user.id,
      prompt: data.prompt,
      type: data.type || "text",
      model: data.model,
      result: data.result,
    });

    return { success: true, id };
  } catch (error) {
    console.error("Failed to add to history:", error);
    return { success: false, error: "Failed to add to history" };
  }
}

export async function getPromptHistory() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return [];
  }

  const history = await db
    .select()
    .from(promptHistories)
    .where(eq(promptHistories.userId, session.user.id))
    .orderBy(desc(promptHistories.createdAt));

  return history;
}

export async function deletePrompt(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .delete(savedPrompts)
      .where(
        and(eq(savedPrompts.id, id), eq(savedPrompts.userId, session.user.id))
      );

    revalidatePath("/dashboard/directory/saved");
    revalidatePath("/dashboard/directory");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete prompt:", error);
    return { success: false, error: "Failed to delete prompt" };
  }
}
