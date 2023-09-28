import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import prisma from "@/libs/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw { msg: 'Invalid credentials!', status: 400 }
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            }
          });

          if (!user || !user?.hashedPassword) {
            throw { msg: 'Invalid credentials!', status: 400 }
          }

          const matchedPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword,
          );

          if (!matchedPassword) {
            throw { msg: 'Invalid credentials!', status: 400 }
          }

          return user;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
};