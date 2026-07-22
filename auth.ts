import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

import google from 'next-auth/providers/google';
import credentials from 'next-auth/providers/credentials';

import { findOrCreateOAuthUser, loginWithCredentials } from '@/services/auth.service';

const config = {
  providers: [
    google,
    credentials({
      credentials: {
        identifier: { label: 'Email or username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (rawCredentials) => {
        const identifier = rawCredentials.identifier as string;
        const password = rawCredentials.password as string;

        return loginWithCredentials({ identifier, password });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && token.email) {
        const oauthUser = await findOrCreateOAuthUser({
          email: token.email,
          name: token.name,
        });

        token.id = oauthUser.id;
        token.username = oauthUser.username;
      } else if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }

      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
