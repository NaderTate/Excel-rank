import { NextResponse } from 'next/server';
import { getReview } from './utils';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { link }: { link: string } = await request.json();
  const session: any = await getServerSession(authOptions);
  // check if the link is already in the database

  if (!session || ['free', '', null].includes(session.user.plan)) {
    return NextResponse.redirect('/pricing');
  }

  try {
    let review = await prisma.aiReview.findFirst({
      where: {
        link: link,
      },
    });
    // return the review if exists and updated less than 24 hours ago
    if (review && new Date(review.updatedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000) {
      return NextResponse.json(review, { status: 200 });
    }

    // if not exists or updated more than 24 hours ago
    const data = await getReview(link);
    if (review) {
      review = await prisma.aiReview.update({
        where: {
          id: review.id,
        },
        data: {
          // convert data to string
          aiResponse: JSON.stringify(data),
        },
      });
    } else {
      review = await prisma.aiReview.create({
        data: {
          link: link,
          // convert data to string
          aiResponse: JSON.stringify(data),
        },
      });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: ` An error occured ${error}` }, { status: 500 });
  }
}