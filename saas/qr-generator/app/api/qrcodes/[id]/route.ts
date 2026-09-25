import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canUseBranding } from "@/lib/plan";
import { daysAgo } from "@/lib/dates";

const updateSchema = z.object({
  targetUrl: z.string().url("Bitte eine gültige URL angeben (mit https://)."),
  name: z.string().trim().max(100).optional().nullable(),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Farbe muss ein Hex-Code sein, z. B. #1a1a1a.")
    .optional(),
});

async function loadOwnedQrCode(id: string, userId: string) {
  const qrCode = await prisma.qrCode.findUnique({ where: { id } });
  if (!qrCode || qrCode.userId !== userId) return null;
  return qrCode;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  const { id } = await params;
  const qrCode = await loadOwnedQrCode(id, session.user.id);
  if (!qrCode) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  const [totalScans, last7DaysScans] = await Promise.all([
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

  return NextResponse.json({
    ...qrCode,
    stats: {
      totalScans,
      last7DaysScans,
    },
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  const { id } = await params;
  const qrCode = await loadOwnedQrCode(id, session.user.id);
  if (!qrCode) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const color =
    parsed.data.color && user && canUseBranding(user.plan)
      ? parsed.data.color
      : qrCode.color;

  // Note: slug is intentionally never changed here — that's the whole
  // point of a "dynamic" QR code: the printed code keeps pointing at
  // /r/<slug>, only the underlying targetUrl changes.
  const updated = await prisma.qrCode.update({
    where: { id: qrCode.id },
    data: {
      targetUrl: parsed.data.targetUrl,
      name: parsed.data.name ?? null,
      color,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  const { id } = await params;
  const qrCode = await loadOwnedQrCode(id, session.user.id);
  if (!qrCode) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  await prisma.qrCode.delete({ where: { id: qrCode.id } });
  return NextResponse.json({ ok: true });
}
