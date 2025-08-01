import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // In a real app, you would check the credentials against your database
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "John Doe",
            email: "user@example.com",
            role: "user",
          }
        } else if (credentials?.email === "agent@example.com" && credentials?.password === "password") {
          return {
            id: "2",
            name: "Jane Smith",
            email: "agent@example.com",
            role: "agent",
          }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
})

export { handler as GET, handler as POST }
