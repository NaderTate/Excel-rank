"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoogleMap, Marker } from "@react-google-maps/api";

import BusinessCard from "./BusinessCard";

import { AiOutlineDoubleRight } from "react-icons/ai";

import { generateCircleLocations } from "@/lib/helpers";

type Props = {
  keywords: string[];
  placeData: {
    position: google.maps.LatLngLiteral;
    id: string;
    suggestedKeywords: string[];
  };
};

export default function MapSection({ keywords, placeData }: Props) {
  const [locationsWithRanking, setLocationsWithRanking] = useState<
    { id: number; lat: number; lng: number; ranking: number }[]
  >([]);
  const [results, setResults] = useState<any[]>([]);
  const [closed, setClosed] = useState<Boolean>(false);

  const center = useMemo<google.maps.LatLngLiteral>(
    () => ({ lat: placeData.position.lat, lng: placeData.position.lng }),
    [placeData.position]
  );
  const options = useMemo<google.maps.MapOptions>(
    () => ({
      mapId: "cc93c8e2ede4cd81",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onMapLoad = (map: any) => {
    let request = {
      location: center,
      radius: 2000,
      keyword: keywords.join(","),
      fields: [
        "name",
        "formatted_address",
        "place_id",
        "rating",
        "icon",
        "photos",
      ],
    };
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === "OK") {
        setResults(results as any[]);
      }
    });

    const circlarLocations = generateCircleLocations(center, 2000, 750);
    circlarLocations.forEach((location, index) => {
      let req = {
        location: location,
        radius: 2000,
        keyword: keywords.join(","),
        fields: ["place_id"],
      };
      service.nearbySearch(req, (results: any, status) => {
        if (status === "OK") {
          // get the index of the place_id the equals id
          const index = results.findIndex(
            (result: any) => result.place_id === placeData.id
          );
          setLocationsWithRanking((prev) => [
            ...prev,
            {
              id: index,
              lat: location.lat,
              lng: location.lng,
              ranking: index + 1,
            },
          ]);
        }
      });
    });
  };

  return (
    <div className="relative w-full h-full ">
      <div className="absolute z-[2] top-0 left-0 flex items-center gap-5 bg-white rounded-br-2xl px-5 ">
        <h1 className="sm:text-lg my-2 font-bold text-black">
          Top 20 results{" "}
        </h1>
        <button
          onClick={() => setClosed(!closed)}
          className="flex items-center gap-2 text-sm font-bold uppercase text-gray-900 transition hover:bg-white"
        >
          <AiOutlineDoubleRight
            className={`text-2xl transition ${
              !closed ? "transform rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <AnimatePresence>
        {!closed && (
          <motion.div
            initial={{ opacity: 0, x: -10, width: 0 }}
            animate={{
              opacity: 1,
              x: 0,
              width: "auto",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            exit={{ opacity: 0, x: -10, width: 0 }}
            className="absolute z-[1] top-0 pt-16 left-0 h-full  max-w-xl bg-white/80 flex flex-col overflow-hidden"
          >
            <div className="flex flex-col text-black ml-5">
              <h1 className="text-sm">Keywords 📝</h1>
              <div className="flex flex-wrap p-2 gap-2 items-center ">
                {keywords &&
                  keywords.map((word, index) => (
                    <div key={index + "keyword" + word} className=" text-xs ">
                      {word}
                    </div>
                  ))}
              </div>
            </div>
            <motion.div className="flex flex-col gap-2 p-4 flex-1 overflow-scroll">
              {results.map((result, index) => (
                <BusinessCard
                  key={index + "result" + result.place_id}
                  id={placeData.id}
                  placeData={result}
                  Rank={index + 1}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full h-full rounded-xl overflow-hidden bg-white">
        <GoogleMap
          onLoad={onMapLoad}
          zoom={14}
          center={center}
          mapContainerClassName="mapContainer"
          options={options}
        >
          <Marker position={center} />
          {locationsWithRanking &&
            locationsWithRanking.map(
              (
                {
                  lat,
                  lng,
                  ranking,
                }: {
                  lat: number;
                  lng: number;
                  ranking: number;
                },
                i
              ) => (
                <Marker
                  key={i}
                  position={{
                    lat: lat,
                    lng: lng,
                  }}
                  title={`You rank #${
                    ranking > 0 ? ranking : "20+"
                  } at this location`}
                  options={{
                    icon: {
                      url: `${
                        ranking <= 5 && ranking > 0
                          ? "https://res.cloudinary.com/dqkyatgoy/image/upload/v1695413191/Frame_18_tvweyd.svg"
                          : ranking <= 10 && ranking > 5
                          ? "https://res.cloudinary.com/dqkyatgoy/image/upload/v1695413192/Frame_20_byzjky.svg"
                          : "https://res.cloudinary.com/dqkyatgoy/image/upload/v1695413192/Frame_21_usmjgy.svg"
                      }`,
                      scaledSize: new google.maps.Size(50, 50),
                      anchor: new google.maps.Point(25, 25),
                    },
                    opacity: 1,
                    label: {
                      text: ranking > 0 ? ranking.toString() : "20+",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    },
                  }}
                />
              )
            )}
        </GoogleMap>
      </div>
    </div>
  );
}
