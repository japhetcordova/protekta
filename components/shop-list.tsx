// components/ShopList.tsx
'use client'

interface Shop {
  id: number
  name: string
  description: string | null
  shelves: number | null
}

export function ShopList({ shops }: { shops: Shop[] }) {
  return (
    <ul className="space-y-2">
      {shops.map((shop) => (
        <li
          key={shop.id}
          className="border rounded-lg p-3 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold">{shop.name}</h3>
          {shop.description && (
            <p className="text-sm text-gray-600">{shop.description}</p>
          )}
          <p className="text-xs text-gray-500">
            Shelves: {shop.shelves ?? 0}
          </p>
        </li>
      ))}
    </ul>
  )
}
