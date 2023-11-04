"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { AiFillStar } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import Places from "./Places";
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
function Map() {
  const [loading, setLoading] = useState<boolean>(false);
  const [place, setPlace] = useState<LatLngLiteral>();
  const [id, setId] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [results, setResults] = useState<DirectionsResult[]>([]);
  const [averageRanking, setAverageRanking] = useState<number | null>(null);
  const [randomLocations, setRandomLocations] = useState<
    { id: number; lat: number; lng: number }[]
  >([]);
  const [locationsWithRanking, setLocationsWithRanking] = useState<
    { id: number; lat: number; lng: number; ranking: number }[]
  >([]);
  const radius = 2000;
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: place?.lat || 40, lng: place?.lng || -73 }),
    [place]
  );
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "cc93c8e2ede4cd81",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  // radius in meters and steps in meters
  // steps is the distance between each random location
  const generateRandomLocations = (
    center: LatLngLiteral,
    radius: number,
    steps: number
  ) => {
    const sections = Math.floor(radius / steps);
    const randomLocations: Array<{ id: number; lat: number; lng: number }> = [];
    // Generate the MATRIX
    for (let i = 1; i <= sections; i++) {
      for (let j = 1; j <= sections; j++) {
        const locations = [
          {
            id: i * j,
            lat: center.lat + (steps / 100000) * i,
            lng: center.lng + (steps / 100000) * j,
          },
          {
            id: i * j + 1,
            lat: center.lat + (steps / 100000) * i,
            lng: center.lng - (steps / 100000) * j,
          },
          {
            id: i * j + 2,
            lat: center.lat - (steps / 100000) * i,
            lng: center.lng + (steps / 100000) * j,
          },
          {
            id: i * j + 3,
            lat: center.lat - (steps / 100000) * i,
            lng: center.lng - (steps / 100000) * j,
          },
        ];
        randomLocations.push(...locations);
      }

      const locations = [
        {
          id: i,
          lat: center.lat + 0,
          lng: center.lng + (steps / 100000) * i,
        },
        {
          id: i + 1,
          lat: center.lat + 0,
          lng: center.lng - (steps / 100000) * i,
        },
        {
          id: i + 2,
          lat: center.lat + (steps / 100000) * i,
          lng: center.lng + 0,
        },
        {
          id: i + 3,
          lat: center.lat - (steps / 100000) * i,
          lng: center.lng + 0,
        },
      ];

      randomLocations.push(...locations);
    }
    return randomLocations;
  };
  useEffect(() => {
    if (place) {
      setRandomLocations(generateRandomLocations(place, radius, 750));
    }
  }, [place]);
  useEffect(() => {
    // Make a request at each point on the grid and get the ranking of the business
    const getRankings = async () => {
      const locations = [];
      setLoading(true);
      for (let i = 0; i < randomLocations.length; i++) {
        const location = randomLocations[i];
        const res = await fetch(`/api/nearbysearch`, {
          method: "POST",
          body: JSON.stringify({
            lat: location.lat,
            lng: location.lng,
            keywords,
            radius,
            type: suggestedKeywords[0],
          }),
        });
        const data = await res.json();
        const index = data.findIndex((obj: any) => obj.place_id === id);
        locations.push({ ...location, ranking: index + 1 });
      }
      setLocationsWithRanking(locations);
      setLoading(false);
      // loop over locations and get the average ranking
      const rankings = locations.map((location) => location.ranking);
      const sum = rankings.reduce((a, b) => a + b, 0);
      const average = sum / rankings.length || null;
      setAverageRanking(average);
    };

    getRankings();
  }, [results]);

  const BusinessCard = ({
    name,
    ranking,
    position,
    competitorId,
  }: {
    name: string;
    ranking: number;
    position: number;
    competitorId: string;
  }) => (
    <div
      className={`bg-white rounded-md p-1 my-1 border-2 text-black w-full ${
        competitorId == id &&
        (position <= 5
          ? "border-green-500/80"
          : position > 5 && position <= 10
          ? "border-yellow-500/80"
          : "border-red-500/80")
      }`}
    >
      <div className="flex justify-between items-center">
        <span
          className={` rounded-md px-1 ${
            position <= 5
              ? "bg-green-600/50 text-green-900"
              : position > 5 && position <= 10
              ? "bg-yellow-600/50 text-yellow-900"
              : "bg-red-600/50 text-red-900"
          }`}
        >
          pos: {position}
        </span>
        <p className="flex items-center">
          {ranking}
          <AiFillStar fill="yellow" />
        </p>
      </div>
      <p className="">{name}</p>
    </div>
  );
  // A visibility bar, it's filled based on the business average rank
  const VisibilityBar = ({ averageRanking }: { averageRanking: number }) => {
    const percentage = 100 - (averageRanking * 100) / 20;
    return (
      <div className="w-full">
        <h1 className="font-bold text-white">Visibility:</h1>
        <div className="">
          <div>
            {averageRanking <= 5
              ? "Great"
              : averageRanking > 5 && averageRanking <= 12
              ? "Medium"
              : "Bad"}
          </div>
          <div className="relative h-2">
            <div className="absolute top-0 right-0 left-0 bottom-0 flex bg-white rounded-full"></div>
            <div
              style={{ width: `${percentage}%` }}
              className={`relative h-2 top-0 right-0 left-0 bottom-0 flex overflow-hidden bg-green-600 rounded-full`}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* The first component that lets you select your business from the dropdown menu */}
      {(!place || !id) && (
        <Places
          setPlace={(position, id, suggestedKeywords) => {
            setPlace(position);
            setId(id);
            setSuggestedKeywords(suggestedKeywords);
            mapRef.current?.panTo(position);
          }}
        />
      )}
      {/* The second component that lets you type some keywords */}
      {place && id && results.length == 0 && (
        <div className="m-28 p-10 border-teal-300 border rounded-md">
          <h1 className="text-3xl">
            Type some keywords separated by comma (&quot;,&quot;)
          </h1>
          <div className="flex justify-center">
            <input
              onChange={(e) => setKeywords(e.target.value.split(","))}
              type="text"
              className="rounded-md w-full p-2 outline-1 border border-teal-800 outline-teal-600"
              placeholder="Type some keywords"
            />
          </div>
          {suggestedKeywords.length > 0 && (
            <div className="flex justify-center mt-10">
              <p className="text-lg">
                Suggested keywords:{" "}
                {suggestedKeywords.map((keyword) => (
                  <span key={keyword} className="text-teal-800 mx-2">
                    {keyword}
                  </span>
                ))}
              </p>
            </div>
          )}
          <div className="flex justify-center">
            <button
              onClick={async () => {
                const res = await fetch(`/api/nearbysearch`, {
                  method: "POST",
                  body: JSON.stringify({
                    lat: place.lat,
                    lng: place.lng,
                    keywords,
                    radius,
                    type: suggestedKeywords[0],
                  }),
                });
                const data = await res.json();
                setResults(data);
              }}
              className="rounded-md w-56 mt-10 p-2 outline-1 border border-teal-800 outline-teal-600"
            >
              Search
            </button>
          </div>
        </div>
      )}
      {/* The side menu on the left */}
      {results.length > 0 && (
        <div className="flex h-screen">
          <div className="h-screen bg-teal-500 w-56 flex flex-col items-center p-5 fixed overflow-auto pb-20">
            {loading && (
              <div className="flex justify-center items-center">
                <ClipLoader color="#ffffff" />
                <div>
                  <p className="text-white">Loading Nearby ratings</p>
                </div>
              </div>
            )}
            {averageRanking && (
              <VisibilityBar averageRanking={averageRanking} />
            )}
            <ul>
              {results.map((result: any, i) => (
                <li key={result.place_id}>
                  <BusinessCard
                    name={result.name}
                    ranking={result.rating}
                    position={i + 1}
                    competitorId={result.place_id}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-screen h-screen ml-56">
            <GoogleMap
              zoom={14}
              center={center}
              mapContainerClassName="mapContainer"
              options={options}
              onLoad={onLoad}
            >
              {/* A marker on the location of the business */}
              <Marker position={center} />
              {/* Markers on the random locations */}
              {locationsWithRanking.map(
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
      )}
    </div>
  );
}

export default Map;
