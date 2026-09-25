import QRCode from "qrcode";

/**
 * Renders a QR code for the given redirect URL as a PNG data URL
 * (data:image/png;base64,...), so it can be shown/downloaded straight
 * from the browser without a separate file store.
 */
export async function renderQrPngDataUrl(
  redirectUrl: string,
  color = "#000000"
): Promise<string> {
  return QRCode.toDataURL(redirectUrl, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 512,
    color: {
      dark: color,
      light: "#ffffff",
    },
  });
}

/** Renders a QR code as an SVG markup string. */
export async function renderQrSvg(
  redirectUrl: string,
  color = "#000000"
): Promise<string> {
  return QRCode.toString(redirectUrl, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: {
      dark: color,
      light: "#ffffff",
    },
  });
}

export function buildRedirectUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/r/${slug}`;
}
