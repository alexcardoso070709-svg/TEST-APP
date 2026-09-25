"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NewQrCodePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [targetUrl, setTargetUrl] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/qrcodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUrl, name: name || undefined, color }),
    });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Erstellen fehlgeschlagen.");
      return;
    }

    router.push(`/dashboard/${data.id}`);
  }

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-6 py-12">
      <Link href="/dashboard" className="text-sm text-slate-500 hover:underline">
        ← Zurück zum Dashboard
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">
        Neuer QR-Code
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Der QR-Code zeigt auf einen kurzen QuickQR-Link, nicht direkt auf deine
        Ziel-URL. So kannst du die Ziel-URL später ändern, ohne den QR-Code neu zu
        drucken.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Ziel-URL
          <input
            type="url"
            required
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://deine-website.de/speisekarte"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Name (optional)
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z. B. Speisekarte Tisch 1"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Branding-Farbe (Pro-Feature — im Free-Plan wird Schwarz verwendet)
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-20 rounded-md border border-slate-300"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {loading ? "Erstellen…" : "QR-Code erstellen"}
        </button>

        {!session && (
          <p className="text-xs text-slate-500">Du musst angemeldet sein, um fortzufahren.</p>
        )}
      </form>
    </main>
  );
}
