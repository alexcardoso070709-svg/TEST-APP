"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckoutButton({
  interval,
  label,
}: {
  interval: "monthly" | "yearly";
  label: string;
}) {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (status !== "authenticated") {
      router.push("/signup");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ??
            "Stripe-Checkout ist im MVP noch nicht aktiv (fehlende Live-Keys)."
        );
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Es ist ein Fehler aufgetreten.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full rounded-md bg-slate-900 px-4 py-2.5 font-medium text-white hover:bg-slate-700 disabled:opacity-60"
      >
        {loading ? "Weiterleiten…" : label}
      </button>
      {error && <p className="mt-2 text-xs text-amber-700">{error}</p>}
    </div>
  );
}
