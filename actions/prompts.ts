"use server";

import { db } from "@/db";
import { savedPrompts, promptHistories } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";

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
    throw new Error("Unauthorized");
  }

  const id = crypto.randomUUID();
  await db.insert(savedPrompts).values({
    id,
    userId: session.user.id,
    title: data.title,
    description: data.prompt,
    prompt: data.prompt,
    type: data.type || "text",
    model: data.model,
    result: data.result,
    mediaUrl: data.mediaUrl,
    tags: data.tags || [],
  });

  revalidatePath("/dashboard/directory");
  revalidatePath("/dashboard/directory/saved");
  return { success: true, id };
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
