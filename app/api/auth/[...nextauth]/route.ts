import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER as string,
      from: process.env.EMAIL_FROM as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
