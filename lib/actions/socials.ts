'use server';
import Prisma from '@/lib/prisma';
import OpenAI from 'openai';
import GPT3Tokenizer from 'gpt3-tokenizer';

export const getFacebookReview = async (postId: string, comments: string) => {
  console.log('getFacebookReview');
  const savedReview = await Prisma.aiFacebookReview.findFirst({
    where: {
      postId: postId,
    },
  });
  // return if exists and updated less than 24 hours ago
  if (savedReview && new Date(savedReview.updatedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000) {
    return savedReview;
  } else {
    // get the review from openai
    const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
    const tokens = tokenizer.encode(comments);
    const text = tokenizer.decode(tokens.bpe.slice(0, 2000));

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Analyze these Comments in general and only return nothing but the following json has the following formate => "{"OverAllReview": "string", "OverAllRating": number, "max3PositiveThings":Array<string>, "max3NegativeThings":Array<string>, "ThingsToImproveInThePost":Array<string>}"',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0,
    });
    // save the review to the database
    const review = await Prisma.aiFacebookReview.create({
      data: {
        postId: postId,
        // convert data to string
        aiResponse: JSON.stringify(response),
      },
    });
    return review;
  }
};
