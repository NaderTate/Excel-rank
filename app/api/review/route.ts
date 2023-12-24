import { NextResponse } from "next/server";
import { getReview } from "./utils";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { YelpBusiness } from "@/types";
import { authOptions } from "@/lib/authOptions";
// export const maxDuration = 200;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { link, yelp }: { link: string; yelp: YelpBusiness } =
    await request.json();
  const session = await getServerSession(authOptions);
  // if (!session || ['free', '', null].includes(session.user.plan)) {
  //   return NextResponse.redirect('/pricing');
  // }

  try {
    let review = await prisma.aiReview.findFirst({
      where: {
        userId: session?.user.id,
        link,
      },
    });
    // return the review if exists and updated less than 24 hours ago
    if (
      review &&
      new Date(review.updatedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
    ) {
      return NextResponse.json(review, { status: 200 });
    }

    // if not exists or updated more than 24 hours ago
    const data = await getReview(link);
    if (!data)
      return NextResponse.json({ error: ` An error occured` }, { status: 500 });
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
      review =
        session &&
        (await prisma.aiReview.create({
          data: {
            link: link,
            userId: session.user.id,
            // convert data to string
            aiResponse: JSON.stringify(data),
            image: yelp.image,
            title: yelp.name,
            address: yelp.location ? yelp.location.address1 : "",
          },
        }));
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: ` An error occured ${error}` },
      { status: 500 }
    );
  }
}
