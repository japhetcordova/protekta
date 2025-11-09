import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const shops = pgTable("shops", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text().default(""),
  shelves: integer().default(0),
});
