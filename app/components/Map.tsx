"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places";
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
function Map() {
  const [place, setPlace] = useState<LatLngLiteral>();
  const [id, setId] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [results, setResults] = useState<DirectionsResult[]>([]);
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
    const getRankings = async () => {
      const locations = [];
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
    };

    getRankings();
  }, [results]);
  return (
    <div>
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
      {place && id && results.length == 0 && (
        <div className="m-28 p-10 border-teal-300 border rounded-md">
          <h1 className="text-3xl">
            Type some keywords separated by comma (",")
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
      {results.length > 0 && (
        <div className="flex h-screen">
          <div className="h-screen bg-teal-500 w-52 p-5 fixed overflow-auto">
            <ul>
              {results.map((result: any) => (
                <li key={result.place_id} className="text-teal-800">
                  {result.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-screen h-screen ml-52">
            <GoogleMap
              zoom={14}
              center={center}
              mapContainerClassName="mapContainer"
              options={options}
              onLoad={onLoad}
            >
              <Marker position={center} />
              {locationsWithRanking.map(
                (
                  location: {
                    id: number;
                    lat: number;
                    lng: number;
                    ranking: number;
                  },
                  i
                ) => {
                  if (location.ranking <= 5) {
                    return (
                      <Marker
                        key={i}
                        position={{
                          lat: location.lat,
                          lng: location.lng,
                        }}
                        title="Ranking at this location"
                        options={{
                          icon: {
                            url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1695413191/Frame_18_tvweyd.svg",
                            scaledSize: new google.maps.Size(50, 50),
                            anchor: new google.maps.Point(25, 25),
                          },
                          opacity: 1,
                          label: {
                            text: location.ranking.toString(),
                            color: "black",
                            fontSize: "16px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    );
                  } else if (location.ranking <= 10 && location.ranking > 5) {
                    return (
                      <Marker
                        key={i}
                        position={{
                          lat: location.lat,
                          lng: location.lng,
                        }}
                        title="Ranking at this location"
                        options={{
                          icon: {
                            url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1695413192/Frame_20_byzjky.svg",
                            scaledSize: new google.maps.Size(50, 50),
                            anchor: new google.maps.Point(25, 25),
                          },
                          opacity: 1,
                          label: {
                            text: location.ranking.toString(),
                            color: "black",
                            fontSize: "16px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    );
                  } else if (location.ranking > 10) {
                    return (
                      <Marker
                        key={i}
                        position={{
                          lat: location.lat,
                          lng: location.lng,
                        }}
                        title="Ranking at this location"
                        options={{
                          icon: {
                            url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1695413192/Frame_21_usmjgy.svg",
                            scaledSize: new google.maps.Size(50, 50),
                            anchor: new google.maps.Point(25, 25),
                          },
                          opacity: 1,
                          label: {
                            text: location.ranking.toString(),
                            color: "black",
                            fontSize: "16px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    );
                  }
                }
              )}
            </GoogleMap>
          </div>
        </div>
      )}
      {/* <div className="flex h-screen">
        <div className="h-screen bg-teal-500 w-52 p-5 fixed">
          <Places
            setPlace={(position) => {
              setPlace(position);
              mapRef.current?.panTo(position);
            }}
          />
        </div>
        <div className="w-screen h-screen ml-52">
          <GoogleMap
            zoom={15}
            center={center}
            mapContainerClassName="mapContainer"
            options={options}
            onLoad={onLoad}
          ></GoogleMap>
        </div>
      </div> */}
    </div>
  );
}

export default Map;
