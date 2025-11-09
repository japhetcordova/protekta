import { getAll } from "@/lib/getAll";
import { ShopList } from "@/components/shop-list";
import { CreateShopForm } from "@/components/shop-form";

export default async function HomePage() {
  const allShops = await getAll();
  return (
    <div>
      <ShopList shops={allShops} />
      <CreateShopForm />
    </div>
  );
}
