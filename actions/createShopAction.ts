"use server";

import { create } from "@/lib/create";
import { revalidatePath } from "next/cache";

export async function createShopAction(data: {
  name: string;
  description?: string;
  shelves?: number;
}) {
  const shop = await create(data);
  revalidatePath("/"); // Revalidate the home page
  return shop;
}
