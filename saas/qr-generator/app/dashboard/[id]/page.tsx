import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { renderQrPngDataUrl, buildRedirectUrl } from "@/lib/qr";
import { isPro } from "@/lib/plan";
import { daysAgo } from "@/lib/dates";
import EditQrForm from "@/components/EditQrForm";

export default async function QrCodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return null;

  const [qrCode, user] = await Promise.all([
    prisma.qrCode.findUnique({ where: { id } }),
    prisma.user.findUnique({ where: { id: session.user.id } }),
  ]);

  if (!qrCode || !user || qrCode.userId !== user.id) {
    notFound();
  }

  const redirectUrl = buildRedirectUrl(qrCode.slug);
  const qrPngDataUrl = await renderQrPngDataUrl(redirectUrl, qrCode.color);

  const [totalScans, recentScans] = await Promise.all([
    prisma.scan.count({ where: { qrCodeId: qrCode.id } }),
    prisma.scan.findMany({
      where: {
        qrCodeId: qrCode.id,
        createdAt: { gte: daysAgo(7) },
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, createdAt: true },
    }),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <Link href="/dashboard" className="text-sm text-slate-500 hover:underline">
        ← Zurück zum Dashboard
      </Link>

      <div className="mt-4 grid gap-8 sm:grid-cols-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            {qrCode.name || "QR-Code"}
          </h1>
          <p className="mt-1 break-all font-mono text-sm text-slate-600">
            {redirectUrl}
          </p>

          <div className="mt-4 inline-block rounded-lg border border-slate-200 bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- data: URL, not an optimizable remote image */}
            <img
              src={qrPngDataUrl}
              alt={`QR-Code für ${redirectUrl}`}
              width={220}
              height={220}
            />
          </div>
          <div className="mt-3 flex gap-3 text-sm">
            <a
              href={qrPngDataUrl}
              download={`qrcode-${qrCode.slug}.png`}
              className="font-medium text-slate-900 underline"
            >
              PNG herunterladen
            </a>
          </div>

          <EditQrForm
            qrCode={{
              id: qrCode.id,
              targetUrl: qrCode.targetUrl,
              name: qrCode.name,
              color: qrCode.color,
            }}
            canUseBranding={isPro(user.plan)}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Statistik</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-2xl font-bold text-slate-900">{totalScans}</p>
              <p className="text-sm text-slate-500">Scans gesamt</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-2xl font-bold text-slate-900">{recentScans.length}</p>
              <p className="text-sm text-slate-500">Scans (7 Tage)</p>
            </div>
          </div>

          <h3 className="mt-6 text-sm font-medium text-slate-700">
            Letzte Scans (7 Tage)
          </h3>
          {recentScans.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">
              Noch keine Scans in den letzten 7 Tagen.
            </p>
          ) : (
            <ul className="mt-2 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white text-sm">
              {recentScans.map((scan) => (
                <li key={scan.id} className="px-4 py-2 text-slate-700">
                  {new Intl.DateTimeFormat("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(scan.createdAt)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
