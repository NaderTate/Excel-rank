"use client";
import * as cheerio from "cheerio";
import axios from "axios";
import OpenAI from "openai";
import GPT3Tokenizer from "gpt3-tokenizer";
import {
  createYelpReview,
  isYelpLinkExists,
  updateYelpReview,
} from "./_actions";
export const maxDuration = 200; // This function can run for a maximum of 200 seconds
const GPTPrompt = `Analyze these responses in general and only return nothing but the following json with the following format => "{"FinalReview": "string", "OverAllRating": number, "max3PositiveThings":Array<string>, "max3NegativeThings":Array<string>, "RecommendationsForImprovement":Array<string>}"`;
const getReview = async (link: string) => {
  try {
    const pages = await Promise.all([
      axios.get(link),
      axios.get(link + "?start=10"),
      // axios.get(link + '?start=20'),
      // axios.get(link + '?start=30'),
      // axios.get(link + '?start=40'),
    ]);
    const $ = cheerio.load(pages.map((page) => page.data).join(""));
    const comments = $("ul.list__09f24__ynIEd span.raw__09f24__T4Ezm")
      .map((index, element) => {
        return $(element).text();
      })
      .get();

    const starRating = $("ul.list__09f24__ynIEd div.five-stars__09f24__mBKym")
      .map((index, element) => {
        return $(element).attr("aria-label");
      })
      .get();

    const textData = comments
      .map(
        (comment, index) =>
          "starRating: " + starRating[index] + " comment: " + comment
      )
      .join(" ");

    const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
    const tokens = tokenizer.encode(textData);
    const text = tokenizer.decode(tokens.bpe.slice(0, 2000));

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
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
  } catch (error: any) {
    return false;
  }
};

export const handleReviews = async (
  link: string,
  userId: string,
  yelpData: YelpBusiness
) => {
  let review = await isYelpLinkExists(link, userId);
  // return the review if exists and updated less than 24 hours ago
  if (
    review &&
    new Date(review.updatedAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
  ) {
    return { success: true, data: review };
  }

  // if not exists or updated more than 24 hours ago
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
