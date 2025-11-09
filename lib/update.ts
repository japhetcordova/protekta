"use server";

import { db } from "@/db";
import { shops } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function update(
  id: number,
  data: { name?: string; description?: string; shelves?: number }
) {
  const result = await db
    .update(shops)
    .set({
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(data.shelves !== undefined && { shelves: data.shelves }),
    })
    .where(eq(shops.id, id))
    .returning();

  return result[0]; // return the updated shop
}
