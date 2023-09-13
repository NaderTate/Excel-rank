import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { link } = await request.json();
    const pages = await Promise.all([
      axios.get(link),
      axios.get(link + '?start=10'),
      axios.get(link + '?start=20'),
      axios.get(link + '?start=30'),
      axios.get(link + '?start=40'),
    ]);
    const $ = cheerio.load(pages.map((page) => page.data).join(''));
    const comments = $('ul.list__09f24__ynIEd span.raw__09f24__T4Ezm')
      .map((index, element) => {
        return $(element).text();
      })
      .get();

    const reviewsCount = $('[href=#reviews]')
      .map((index, element) => {
        return $(element).text();
      })
      .get();

    const starRating = $('ul.list__09f24__ynIEd div.five-stars__09f24__mBKym')
      .map((index, element) => {
        return $(element).attr('aria-label');
      })
      .get();

    const data = [];

    for (let i = 0; i < comments.length; i++) {
      const item = {
        starRating: starRating[i],
        comment: comments[i],
      };
      data.push(item);
    }

    return NextResponse.json({
      TotalComments: Number(reviewsCount[0].split('(')[1].split(' ')[0].replace(',', '')),
      CommentsReturned: comments.length,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 200 });
  }
}
