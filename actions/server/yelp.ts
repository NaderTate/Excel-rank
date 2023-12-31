"use server";
import * as cheerio from "cheerio";
import Prisma from "@/lib/prisma";

import axios from "axios";
import { YelpBusinessInfo } from "@/types";

// check if yelp link exists in user schema
export const isYelpLinkExists = async (link: string, userId: string) => {
  const yelp = await Prisma.aiReview.findFirst({
    where: {
      userId,
      link,
    },
  });
  return yelp;
};

// create new review
export const createYelpReview = async (
  link: string,
  userId: string,
  aiResponse: string,
  yelp: YelpBusinessInfo
) => {
  const yelpReview = await Prisma.aiReview.create({
    data: {
      link,
      userId,
      aiResponse,
      image: yelp.image,
      title: yelp.name,
      address: yelp.location ? yelp.location.address1 : "",
    },
  });
  return yelpReview;
};

// update yelp review
export const updateYelpReview = async (id: string, aiResponse: string) => {
  const yelp = await Prisma.aiReview.update({
    where: {
      id: id,
    },
    data: {
      aiResponse,
    },
  });
  return yelp;
};

// get yelp page data
export const getYelpPageData = async (link: string) => {
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
  return textData;
};
