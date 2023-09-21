import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const { link }: { link: string } = await request.json();
  const bizName = link.split("biz/")[1];
  const response = await fetch(
    `https://api.yelp.com/v3/businesses/${bizName}`,
    {
      method: "GET",
      headers: {
        Authorization:
          "Bearer oQIVGyICm0C5aj1aS9RgAe2T5fTpDWW1IglR6aSKxNP-Ca_EWt-xyz8vYdVCHH00Ximij42_kRze8Tt7aO5Ie27Ph1rzEouIkc8fzx3KSu_vOfyQ9-i5sZl1xTL6ZHYx",
      },
    }
  );
  const data = await response.json();
  return NextResponse.json({
    name: data.name,
    image: data.image_url,
    rating: data.rating,
    location: data.location,
    openNow: data.hours[0].is_open_now,
  });
}
