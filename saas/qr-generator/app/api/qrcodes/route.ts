import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { canCreateMoreQrCodes, canUseBranding } from "@/lib/plan";

const createSchema = z.object({
  targetUrl: z.string().url("Bitte eine gültige URL angeben (mit https://)."),
  name: z.string().trim().max(100).optional(),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Farbe muss ein Hex-Code sein, z. B. #1a1a1a.")
    .optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const qrCodes = await prisma.qrCode.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { scans: true } } },
  });

  return NextResponse.json(
    qrCodes.map((qr) => ({
      id: qr.id,
      slug: qr.slug,
      name: qr.name,
      targetUrl: qr.targetUrl,
      color: qr.color,
      createdAt: qr.createdAt,
      scanCount: qr._count.scans,
    }))
  );
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Ungültige Eingabe." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { _count: { select: { qrCodes: true } } },
  });
  if (!user) {
    return NextResponse.json({ error: "Nutzer nicht gefunden." }, { status: 404 });
  }

  if (!canCreateMoreQrCodes(user.plan, user._count.qrCodes)) {
    return NextResponse.json(
      {
        error:
          "Free-Plan-Limit erreicht (1 QR-Code). Upgrade auf Pro für unbegrenzte QR-Codes.",
      },
      { status: 403 }
    );
  }

  const color =
    parsed.data.color && canUseBranding(user.plan) ? parsed.data.color : "#000000";

  // Retry a few times in the unlikely event of a slug collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = generateSlug(6);
    try {
      const qrCode = await prisma.qrCode.create({
        data: {
          slug,
          name: parsed.data.name || null,
          targetUrl: parsed.data.targetUrl,
          color,
          userId: user.id,
        },
      });
      return NextResponse.json(qrCode, { status: 201 });
    } catch (err: unknown) {
      const isUniqueViolation =
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: string }).code === "P2002";
      if (isUniqueViolation && attempt < 4) continue;
      throw err;
    }
  }

  return NextResponse.json(
    { error: "Konnte keinen eindeutigen Slug erzeugen. Bitte erneut versuchen." },
    { status: 500 }
  );
}
