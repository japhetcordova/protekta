import { db } from "@/db";
import { shops } from "@/db/schema";

export async function create(data: { name: string; description?: string; shelves?: number }) {
  const result = await db
    .insert(shops)
    .values({
      name: data.name,
      description: data.description ?? "",
      shelves: data.shelves ?? 0,
    })
    .returning();

  return result[0]; // return the inserted shop
}
