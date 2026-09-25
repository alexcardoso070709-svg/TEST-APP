import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe base config, shared between the full auth.ts (used in API
 * routes / server components, runs on Node.js and talks to Prisma) and
 * middleware.ts (runs on the Edge runtime, must NOT import Prisma or
 * bcrypt). Providers that touch the database are added only in auth.ts.
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  // Required for self-hosting behind a proxy/PaaS (Railway, Fly.io, Docker,
  // this sandbox) where the incoming Host header may not exactly match
  // NEXTAUTH_URL. See https://errors.authjs.dev#untrustedhost
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
};
