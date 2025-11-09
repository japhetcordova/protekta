import { db } from "@/db";
import { shops } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteShop(id: number) {
  const result = await db.delete(shops).where(eq(shops.id, id)).returning();
  return result[0]; // returns the deleted record
}
