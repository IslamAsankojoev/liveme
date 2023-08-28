import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from 'api/auth.service';
import axiosInstance from 'api/axios.config';
import type { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  secret: 'islamka',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: 'name', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const data = await AuthService.login(credentials);
        return {
          ...data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          id: data.user.id,
        };
      },
    }),
  ],

  jwt: {
    secret: 'islamka',
    maxAge: 24 * 60 * 60 * 1, // 1 day
  },
  session: {
    maxAge: 24 * 60 * 60 * 1, // 1 day
  },
  pages: {
    signIn: process.env.SITE_URL + '/login',
    signOut: process.env.SITE_URL + '/login',
    error: process.env.SITE_URL + '/login',
  },

  callbacks: {
    async signIn() {
      return true;
    },
    // @ts-ignore
    async jwt({ token, user }: { token: any; user: ISession }) {
      return {...token, ...user}
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token
      return session;
    },
  },
};

export default NextAuth(authOptions);
