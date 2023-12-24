"use client";
import * as cheerio from "cheerio";
import OpenAI from "openai";
import GPT3Tokenizer from "gpt3-tokenizer";
import {
  createYelpReview,
  getYelpPageData,
  isYelpLinkExists,
  updateYelpReview,
} from "./_actions";
import { YelpBusiness } from "@/types";
// export const maxDuration = 200;
const GPTPrompt = `Analyze these responses in general and only return nothing but the following json with the following format => "{"FinalReview": "string", "OverAllRating": number, "max3PositiveThings":Array<string>, "max3NegativeThings":Array<string>, "RecommendationsForImprovement":Array<string>}"`;
const getReview = async (link: string) => {
  try {
    const comments = await getYelpPageData(link);
    const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
    const tokens = tokenizer.encode(comments);
    const text = tokenizer.decode(tokens.bpe.slice(0, 2000));

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
      dangerouslyAllowBrowser: true,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: GPTPrompt,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0,
    });
    return { data: response.choices[0].message };
  } catch (error) {
    return false;
  }
};

export const handleReviews = async (
  link: string,
  userId: string,
  yelpData: YelpBusiness
) => {
  let review = await isYelpLinkExists(link, userId);
  if (
    review &&
    new Date(review.updatedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
  ) {
    return { success: true, data: review };
  }

  const data = await getReview(link);
  if (!data) return { success: false, message: "An error occured" };
  if (review) {
    review = await updateYelpReview(review.id, JSON.stringify(data));
  } else {
    review = await createYelpReview(
      link,
      userId,
      JSON.stringify(data),
      yelpData
    );
  }

  return { success: true, data: review };
};
