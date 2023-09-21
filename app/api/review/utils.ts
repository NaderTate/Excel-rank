import * as cheerio from 'cheerio';
import axios from 'axios';
import OpenAI from 'openai';
import GPT3Tokenizer from 'gpt3-tokenizer';

export const getReview = async (link: string) => {
  try {
    const pages = await Promise.all([
      axios.get(link),
      axios.get(link + '?start=10'),
      // axios.get(link + '?start=20'),
      // axios.get(link + '?start=30'),
      // axios.get(link + '?start=40'),
    ]);
    const $ = cheerio.load(pages.map((page) => page.data).join(''));
    const comments = $('ul.list__09f24__ynIEd span.raw__09f24__T4Ezm')
      .map((index, element) => {
        return $(element).text();
      })
      .get();

    const starRating = $('ul.list__09f24__ynIEd div.five-stars__09f24__mBKym')
      .map((index, element) => {
        return $(element).attr('aria-label');
      })
      .get();

    const textData = comments
      .map((comment, index) => 'starRating: ' + starRating[index] + ' comment: ' + comment)
      .join(' ');

    const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
    const tokens = tokenizer.encode(textData);
    const text = tokenizer.decode(tokens.bpe.slice(0, 2000));

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Analyze these responses in general and only return nothing but the following json has the following formate => "{"FinalReview": "string", "OverAllRating": number, "max3PositiveThings":Array<string>, "max3NegativeThings":Array<string>, "RecommendationsForImprovement":Array<string>}"',
        },
        {
          role: 'user',
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
