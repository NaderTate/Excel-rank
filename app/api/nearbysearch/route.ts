import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const {
    lat,
    lng,
    keywords,
    radius = 2000,
    type,
  }: {
    lat: number;
    lng: number;
    keywords: Array<string>;
    radius: number;
    type: string;
  } = await request.json();
  const formattedKeywords = keywords.join("|");
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&keyword=${formattedKeywords}&type=${type}&radius=${radius}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  return NextResponse.json(data.results);
}
