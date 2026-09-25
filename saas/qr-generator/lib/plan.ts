export const FREE_PLAN_QR_LIMIT = 1;

export type Plan = "free" | "pro";

export function isPro(plan: string): plan is "pro" {
  return plan === "pro";
}

export function canCreateMoreQrCodes(plan: string, currentCount: number): boolean {
  if (isPro(plan)) return true;
  return currentCount < FREE_PLAN_QR_LIMIT;
}

export function canUseBranding(plan: string): boolean {
  return isPro(plan);
}
