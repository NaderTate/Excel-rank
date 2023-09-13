import * as cheerio from 'cheerio';
import axios from 'axios';

export async function getReviewsViaLink(link) {
  try {
    // const page = await axios.get(link);

    // to get the html content with fetch and overide cross origin
    const page = await fetch(link, {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/html',
      },
    });
    console.log(page);
    // const $ = cheerio.load(page.data); //load the html content
    // const comments = $('p.comment_09f24D0cxf.css-qgunke > span.raw09f24_T4Ezm')
    //   .map((index, element) => {
    //     return $(element).text();
    //   })
    //   .get();

    // const reviewsCount = $('[href=#reviews]')
    //   .map((index, element) => {
    //     return $(element).text();
    //   })
    //   .get();

    // const starRating = $(
    //   'div.margin-t1_09f24w96jn.margin-b1-509f24NHcQi.border-color--default09f24NPAKY > div.arrange09f24LDfbs.gutter-109f24yAbCL.vertical-align-middle09f24zU9sE.border-color--default09f24NPAKY > div.arrange-unit09f24rqHTg.border-color--default09f24NPAKY > span.display--inline09f24c6N_k.border-color--default09f24NPAKY > div.five-stars09f24mBKym.five-stars--regular09f24DgBNj.display--inline-block09f24_fEDiJ',
    // )
    //   .map((index, element) => {
    //     return $(element).attr('aria-label');
    //   })
    //   .get();

    // const userNames = $('span.fs-block.css-ux5mu6 > a.css-19v1rkv')
    //   .map((index, element) => {
    //     return $(element).text();
    //   })
    //   .get();

    // const locations = $(
    //   'div.responsive-hidden-small_09f24qQFtj.border-color--default09f24NPAKY > div.border-color--default09f24_NPAKY > span.css-qgunke',
    // )
    //   .map((index, element) => {
    //     return $(element).text();
    //   })
    //   .get();

    // const data = [];

    // for (let i = 0; i < comments.length; i++) {
    //   const item = {
    //     userName: userNames[i],
    //     location: locations[i + 1],
    //     starRating: starRating[i],
    //     comment: comments[i],
    //   };
    //   data.push(item);
    // }

    // return {
    //   TotalComments: Number(reviewsCount[0].split('(')[1].split(' ')[0].replace(',', '')),
    //   CommentsReturned: comments.length,
    //   data,
    // };
  } catch (error) {
    return { error: `An error occurr: ${error.message}` };
  }
}
