"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type QrCodeFields = {
  id: string;
  targetUrl: string;
  name: string | null;
  color: string;
};

export default function EditQrForm({
  qrCode,
  canUseBranding,
}: {
  qrCode: QrCodeFields;
  canUseBranding: boolean;
}) {
  const router = useRouter();
  const [targetUrl, setTargetUrl] = useState(qrCode.targetUrl);
  const [name, setName] = useState(qrCode.name ?? "");
  const [color, setColor] = useState(qrCode.color);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);

    const res = await fetch(`/api/qrcodes/${qrCode.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUrl, name: name || null, color }),
    });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Speichern fehlgeschlagen.");
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6">
      <h2 className="text-sm font-semibold text-slate-900">
        Ziel-URL bearbeiten
      </h2>
      <p className="text-xs text-slate-500">
        Der QR-Code selbst (der Kurzlink) bleibt dabei unverändert — du musst
        nichts neu drucken.
      </p>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Ziel-URL
        <input
          type="url"
          required
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Branding-Farbe {!canUseBranding && "(nur im Pro-Plan)"}
        <input
          type="color"
          value={color}
          disabled={!canUseBranding}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-20 rounded-md border border-slate-300 disabled:opacity-50"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-700">Gespeichert.</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-60 self-start"
      >
        {loading ? "Speichern…" : "Änderungen speichern"}
      </button>
    </form>
  );
}
