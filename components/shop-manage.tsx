"use client";

import { useState } from "react";
import { update } from "@/lib/update";
import { deleteShop } from "@/lib/delete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, Edit3, Save } from "lucide-react";

interface Shop {
  id: number;
  name: string;
  description: string | null;
  shelves: number | null;
}

interface ShopManagerProps {
  shops: Shop[];
}

export function ShopManager({ shops: initialShops }: ShopManagerProps) {
  const [shops, setShops] = useState<Shop[]>(initialShops);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ name: string; description: string; shelves: number }>({
    name: "",
    description: "",
    shelves: 0,
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    setDeletingId(id);
    await deleteShop(id);
    setShops((prev) => prev.filter((s) => s.id !== id));
    setDeletingId(null);
  }

  function handleEdit(id: number) {
    const shop = shops.find((s) => s.id === id);
    if (!shop) return;
    setEditingId(id);
    setEditData({
      name: shop.name,
      description: shop.description ?? "",
      shelves: shop.shelves ?? 0,
    });
  }

  async function handleSave(id: number) {
    setSaving(true);
    const updated = await update(id, editData);
    setShops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
    setEditingId(null);
    setSaving(false);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {shops.map((shop) => (
        <Card key={shop.id} className="shadow-sm">
          <CardHeader>
            <CardTitle>
              {editingId === shop.id ? (
                <Input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              ) : (
                shop.name
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {editingId === shop.id ? (
              <>
                <Input
                  placeholder="Description"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Shelves"
                  value={editData.shelves}
                  onChange={(e) =>
                    setEditData({ ...editData, shelves: Number(e.target.value) })
                  }
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    onClick={() => handleSave(shop.id)}
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-1" />
                    )}
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  {shop.description || "No description"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Shelves: {shop.shelves ?? "N/A"}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => handleEdit(shop.id)}
                    disabled={editingId !== null}
                  >
                    <Edit3 className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(shop.id)}
                    disabled={deletingId === shop.id}
                  >
                    {deletingId === shop.id ? (
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 mr-1" />
                    )}
                    Delete
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
