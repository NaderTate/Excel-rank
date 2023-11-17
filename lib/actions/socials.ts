"use client";
import OpenAI from "openai";
import GPT3Tokenizer from "gpt3-tokenizer";
import { createFBReview, createIGReview, isPostIdExists } from "./_actions";

export const AnalyzeSocialComments = async (
  postId: string,
  comments: string,
  platform: "facebook" | "instagram"
) => {
  const savedReview = await isPostIdExists(postId);
  // return if exists and updated less than 24 hours ago
  if (
    savedReview &&
    new Date(savedReview.updatedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
  ) {
    return savedReview;
  } else {
    // get the review from openai
    const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
    const tokens = tokenizer.encode(comments);
    const text = tokenizer.decode(tokens.bpe.slice(0, 2000));

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_Nodz_OpenAI_Key,
      dangerouslyAllowBrowser: true,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'You will receive a bunch of comments about on a specific topic, the comments are separated by "/" , I want you to read the comments and give me a summary, like what are the main topics people are talking about, what are the positive aspects, negative aspects, etc.. . Try to give me the response in this form if you can : Positive aspects: ... Negative aspects: ... Overall summary: ... , If you can\'t, just give me a summary of the comments. ',
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.5,
    });
    if (platform === "facebook") {
      const review = await createFBReview(postId, JSON.stringify(response));
      return review;
    } else {
      const review = await createIGReview(postId, JSON.stringify(response));
      return review;
    }
  }
};
