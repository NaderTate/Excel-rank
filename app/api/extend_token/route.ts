import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const { shortToken }: { shortToken: string } = await request.json();
  const longToken = await fetch(`
  https://graph.facebook.com/v18.0/oauth/access_token?  
  grant_type=fb_exchange_token&          
  client_id=${process.env.FACEBOOK_ID}&
  client_secret=${process.env.FACEBOOK_SECRET}&
  fb_exchange_token=${shortToken}
  `);
  const data = await longToken.json();
  return NextResponse.json({ data });
}
