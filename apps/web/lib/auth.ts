// PR3CIO Auth Configuration
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // Placeholder for NextAuth providers
  ],
  callbacks: {
    // Auth callbacks
  },
  pages: {
    signIn: '/login',
  },
};
