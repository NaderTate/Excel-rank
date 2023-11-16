"use server";
import Prisma from "@/lib/prisma";

// check if postId exists
export const isPostIdExists = async (postId: string) => {
  const post = await Prisma.aiFacebookReview.findFirst({
    where: {
      postId: postId,
    },
  });
  return post;
};

// create new Facebook review
export const createFBReview = async (postId: string, aiResponse: string) => {
  const review = await Prisma.aiFacebookReview.create({
    data: {
      postId: postId,
      // convert data to string
      aiResponse,
    },
  });
  return review;
};
