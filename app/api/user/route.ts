import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.user.updateMany({
    where: { email: 'abd3052001@gmail.com' },
    data: { plan: 'free' },
  });

  return NextResponse.json(users, { status: 200 });
};
