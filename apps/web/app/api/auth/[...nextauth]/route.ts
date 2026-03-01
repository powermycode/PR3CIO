import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          return { id: "1", name: "User", email: credentials.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  }
});

export { handler as GET, handler as POST };
