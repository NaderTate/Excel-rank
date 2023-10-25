import { languages } from "@/lib/languages";
import { NextResponse } from "next/server";
const yourhandle = require("countrycitystatejson");

export async function GET() {
  var location = "Los Angeles, California, United States";
  var encodedLocation = Buffer.from(location).toString("base64");
  var url =
    "https://www.google.com/search?q=radio scoop&gl=us&uule=w+CAIQICI" +
    encodedLocation;
  const countries = yourhandle.getCountries();
  const states = yourhandle.getStatesByShort("EG");
  const cities = yourhandle.getCities("EG", "Dumyat");

  return NextResponse.json({ url });
}
