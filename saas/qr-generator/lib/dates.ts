/**
 * Returns the Date exactly `days` days before now.
 * Kept as its own function (rather than inlining `new Date(Date.now() - ...)`
 * in a component) so the impure `Date.now()` call doesn't happen directly in
 * component render code.
 */
export function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}
