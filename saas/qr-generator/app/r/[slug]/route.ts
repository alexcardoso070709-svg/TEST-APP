import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const qrCode = await prisma.qrCode.findUnique({ where: { slug } });

  if (!qrCode) {
    return NextResponse.json(
      { error: "Dieser QR-Code existiert nicht (mehr)." },
      { status: 404 }
    );
  }

  // Log the scan before redirecting. We await this (rather than
  // fire-and-forget) because serverless functions can be frozen/killed
  // right after the response is sent, which would silently drop scans.
  // A logging failure must never block the actual redirect, though.
  try {
    await prisma.scan.create({ data: { qrCodeId: qrCode.id } });
  } catch (err) {
    console.error("Failed to log scan for", slug, err);
  }

  return NextResponse.redirect(qrCode.targetUrl, { status: 302 });
}
