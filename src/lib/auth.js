import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    // whenever any jwt is created or updated this function runs
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, name: true, email: true, username: true, image: true, role: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.username = dbUser.username;
          token.email = dbUser.email;
          token.image = dbUser.image;
          token.role = dbUser.role;
        } else {
          // This block is for new users (e.g., via Google Sign-In)
          const username = user.name?.replace(/\s+/g, '').toLowerCase() || user.email.split('@')[0];
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              role: 'USER',
              username: username
            }
          });
          token.id = newUser.id;
          token.name = newUser.name;
          token.username = newUser.username;
          token.email = newUser.email;
          token.image = newUser.image;
          token.role = newUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session;
    }
  },
  redirect() {
    return '/dashboard';
  }
};

export const getAuthsession = () => getServerSession(authOptions);