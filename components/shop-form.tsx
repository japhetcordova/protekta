"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { createShopAction } from "@/actions/createShopAction";
import { toast } from "sonner"; // optional: for notifications

export function CreateShopForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shelves, setShelves] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Shop name is required");
      return;
    }

    startTransition(async () => {
      try {
        const res = await createShopAction({ name, description, shelves });
        toast.success(`Shop "${res.name}" created successfully`);
        setName("");
        setDescription("");
        setShelves(0);
      } catch (error) {
        console.error(error);
        toast.error("Failed to create shop");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Shop Name</Label>
        <Input
          id="name"
          placeholder="Enter shop name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="shelves">Shelves</Label>
        <Input
          id="shelves"
          type="number"
          placeholder="0"
          value={shelves}
          onChange={(e) => setShelves(Number(e.target.value))}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center"
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Shop"}
      </Button>
    </form>
  );
}
