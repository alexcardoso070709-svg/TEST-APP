import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { buildRedirectUrl } from "@/lib/qr";
import { FREE_PLAN_QR_LIMIT, isPro } from "@/lib/plan";
import DeleteQrButton from "@/components/DeleteQrButton";

export default async function DashboardPage() {
  const session = await auth();
  // middleware/proxy already guards this route, but keep a safe fallback.
  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      qrCodes: {
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { scans: true } } },
      },
    },
  });

  if (!user) return null;

  const qrCodes = user.qrCodes;
  const atFreeLimit = !isPro(user.plan) && qrCodes.length >= FREE_PLAN_QR_LIMIT;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Deine QR-Codes</h1>
          <p className="mt-1 text-sm text-slate-500">
            Plan: <span className="font-medium">{isPro(user.plan) ? "Pro" : "Free"}</span>
            {!isPro(user.plan) && (
              <>
                {" "}
                ({qrCodes.length}/{FREE_PLAN_QR_LIMIT} QR-Codes) ·{" "}
                <Link href="/pricing" className="underline">
                  Auf Pro upgraden
                </Link>
              </>
            )}
          </p>
        </div>
        {atFreeLimit ? (
          <Link
            href="/pricing"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Limit erreicht — Pro holen
          </Link>
        ) : (
          <Link
            href="/dashboard/new"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            + Neuer QR-Code
          </Link>
        )}
      </div>

      {qrCodes.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-600">Du hast noch keinen QR-Code erstellt.</p>
          <Link
            href="/dashboard/new"
            className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Ersten QR-Code erstellen
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Kurzlink</th>
                <th className="px-4 py-3 font-medium">Ziel-URL</th>
                <th className="px-4 py-3 font-medium">Scans</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {qrCodes.map((qr) => (
                <tr key={qr.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {qr.name || <span className="text-slate-400">(ohne Namen)</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">
                    /r/{qr.slug}
                  </td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-slate-600">
                    {qr.targetUrl}
                  </td>
                  <td className="px-4 py-3 text-slate-900">{qr._count.scans}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/${qr.id}`}
                      className="mr-3 font-medium text-slate-900 underline"
                    >
                      Bearbeiten
                    </Link>
                    <DeleteQrButton id={qr.id} name={qr.name || qr.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Redirect-Basis-URL: {buildRedirectUrl("").replace(/\/r\/$/, "/r/<slug>")}
      </p>
    </main>
  );
}
