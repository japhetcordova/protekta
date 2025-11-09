'use cache'

import { db } from "@/db"
import { shops } from "@/db/schema"

export async function getAll() {
  // This result will be cached automatically
  return await db.select().from(shops)
}
