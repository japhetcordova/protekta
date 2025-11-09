import { getAll } from "@/lib/getAll";
//import { ShopList } from "@/components/shop-list";
import { CreateShopForm } from "@/components/shop-form";
import { ShopManager } from "@/components/shop-manage";

export default async function HomePage() {
  const allShops = await getAll();
  return (
    <div>
      <ShopManager shops={allShops} />
      <CreateShopForm />
    </div>
  );
}
