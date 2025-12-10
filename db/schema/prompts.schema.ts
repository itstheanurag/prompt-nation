import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const savedPrompts = pgTable("saved_prompts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull(),
  description: text("description"),
  prompt: text("prompt").notNull(),
  type: text("type").notNull().default("text"),
  model: text("model"),
  result: text("result"),
  mediaUrl: text("media_url"),
  tags: text("tags").array(),
  starred: boolean("starred").default(false),
  lastUsed: timestamp("last_used").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const promptHistories = pgTable("prompt_histories", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  prompt: text("prompt").notNull(),
  type: text("type").notNull().default("text"),
  model: text("model"),
  result: text("result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
