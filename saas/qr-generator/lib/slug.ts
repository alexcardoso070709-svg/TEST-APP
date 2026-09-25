const ALPHABET =
  "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O/1/l/i to avoid ambiguity

/**
 * Generates a short, URL-safe, human-friendly random slug (default 6 chars).
 * Not cryptographically unique by itself — callers should retry on a
 * unique-constraint collision (see app/api/qrcodes/route.ts).
 */
export function generateSlug(length = 6): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return result;
}
