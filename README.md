![Logo](public/logo.svg)

# Excel Rank

#### This project was requested from me by one of my clients, it's a set of AI solutions that help business owners save their time and improve their business reputation.

# Tech used:

#### Next.JS 14, OpenAI, Prisma with MongoDB, Next-Auth, NextUI, Tailwind css, and Typescript.

# Design Principles:

`SOLID`

# Folder Structure:

#### 3 route groups:

- (auth) contains the login page.
- (public) contains all the public pages like the home page, landing pages, etc...
- (Dashboard) contains the protected pages that require login

#### `components` folder at the project root has the components are used in multiple places.

#### components that are used in one file only are inside a `_components` folder in the same route.

#### Any forms have their own hooks in a `_hooks` folder that is responsible for handling the forms states and submitting to the database.

# Features:

### Currently there are 3 services:

1. Review management.
2. Local Ranking.
3. Social monitoring.

## Reivew management:

#### Imagine that you own a hotel, your hotel is doing good and you have lots of reviews on google reviews, yelp, trip advisor, etc...

#### Instead of having to go through all these websites and manually read all the comments, you can connect your account or paste your business link, and it will start scraping the comments and analyzing them using openAI API.

#### After the analysis is done you get a summary of all the comments, what your customers think of your business, what they like/dislike,etc...

Here's a screenshot for the final result

![](https://res.cloudinary.com/dqkyatgoy/image/upload/v1703792981/Frame_27_fnady7.png)

#### We currenly support Yelp only, but I'll add support to more website in the next update.

## Local Ranking

#### This one doesn't use AI, it consists of 2 sub services; Google search SEO, Google maps SEO.

### Google search SEO:

#### Let's say you have a website, and you have audience in different countries around the world.

#### You'd probably want to know how your website ranks on SEO in other countries.

#### Tha't what this tool does, you simply type your search keywords (your site name) and select the country.

#### A new tab will open which simulates a search process from that country the you selected.

#### you can select other options like the city, state, language, device, and if you want to enable safe search.

![](https://res.cloudinary.com/dqkyatgoy/image/upload/v1703791861/image_45_cabrph.png)

### Google maps SEO

#### If you're hungry and you're craving a delicious pizza now, what would you do?

#### There are many options, one of them is that you'd open google maps and search for a pizza restaurant.

#### You'd then get a list of pizza restaurants around you, and you'd most likely order from a restaurant at the top of the list.

#### So, as a restaurant owner, you'd want to know how your restaurant is ranking in your area. right?

#### You'd want to know when someone searches for pizza, does your restaurant show up first, second, or if it's even on the list?

#### And that's what this tool does.

#### All you have to do is search for your restaurant and select it from a suggestions dropdown that will appear as you type.

#### Then you type some search keywords, these are the keywords that your customers would typically search for and you'd want to rank high on, so if you own a seafood restaurant , you'd want your restaurant to rank high on the `seafood` keyword, so you type your keywords and hit Enter.

#### You'd then see your business location on the map and some circles with a number inside of it, this number is your ranking on the list when people search for the keywords that you typed.

#### The analysis is done withing a radius of 2000 meters, I'll probably add the ability to specify the area range that you like to search within.

Here's what the result would look like

the number inside the cirlcle indicates the business position in that location

![](https://res.cloudinary.com/dqkyatgoy/image/upload/v1703791864/image_46_l8babi.png)

## Social monitoring

#### Let's say you're a famous infleuncer, you have thousands of followers on your socials, and your posts get lots of comments.

#### You may not have the time to read all the comments on all the social platforms, so what this service does, is that it allows you to login with your facebook account and choose the facebook/instagram pages that you'd like to connect to the website.

#### You'd then see your posts in a layout kinda similar to facebook, you can see the insights and comments on each posts, but what's important is that you can analyze the comments on each post using AI, so this is similar to the first service (Review manager), but it's for social media.

#### You get a brief of the comments, what people like/dislike etc...

#### This service could be used by anyone, not just infleuncers, news pages, meme pages, cars pages, you name it...

# Next steps

#### I'll keep working on the website when I have time, I'll add support for more website like airbnb, google reviews, trip advisor,etc...

#### And support for other social platform like tiktok, twitter and youtube.

#### If you're interested in this porject and you'd like to contribute hit me up: [+201008564637](https://wa.me/+201008564637)
