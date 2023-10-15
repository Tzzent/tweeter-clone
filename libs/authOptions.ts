import { uniqueUsernameGenerator, Config } from "unique-username-generator";
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
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const matchedPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!matchedPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        const {
          name,
          email,
          image,
        } = user!;

        const {
          type,
          provider,
          providerAccountId,
          access_token,
          expires_at,
          token_type,
          scope,
          id_token,
        } = account!;

        if (!name || !email) return false;

        const userExists = await prisma.user.findUnique({
          where: {
            email: email,
          },
          include: {
            accounts: true,
          }
        });

        const sameProvider = userExists?.accounts.some((acc) => (
          acc.provider === provider
        ));

        if (userExists && sameProvider) {
          return !!userExists;
        }

        if (userExists && !sameProvider) {
          await prisma.account.create({
            data: {
              type,
              provider,
              providerAccountId,
              access_token,
              expires_at,
              token_type,
              scope,
              id_token,
              userId: userExists.id,
            }
          });

          return !!userExists;
        }

        const config: Config = { //-> Config to create a unique username
          dictionaries: [name.split(' ')],
          separator: '',
          style: 'capital',
          randomDigits: 4,
        }

        let username;
        let usernameExists;

        do {
          username = uniqueUsernameGenerator(config);

          usernameExists = await prisma.user.findFirst({
            where: {
              username: username,
            }
          });

        } while (username.includes('Undefined') || usernameExists);

        const userData = await prisma.user.create({
          data: {
            name,
            username,
            email,
            image,
          }
        });

        await prisma.account.create({
          data: {
            type,
            provider,
            providerAccountId,
            access_token,
            expires_at,
            token_type,
            scope,
            id_token,
            userId: userData.id,
          }
        });

        return !!userData;
      } catch (error) {
        console.error('Error during signIn', error);
        return false;
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};