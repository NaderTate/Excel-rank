"use client";
import { useLoadScript } from "@react-google-maps/api";
import Map from "../../../components/Map";
function Page() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });
  return <div>{isLoaded ? <Map /> : <div>Loading...</div>}</div>;
}

export default Page;
