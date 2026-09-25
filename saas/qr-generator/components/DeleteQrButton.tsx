"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteQrButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`QR-Code "${name}" wirklich löschen? Der Kurzlink funktioniert danach nicht mehr.`)) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/qrcodes/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Löschen fehlgeschlagen. Bitte erneut versuchen.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="font-medium text-red-600 hover:underline disabled:opacity-60"
    >
      {loading ? "…" : "Löschen"}
    </button>
  );
}
