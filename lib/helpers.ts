export const setPlaceDataHelper = (
  { position, id, keywords }: any,
  setPlaceData: (data: any) => void
) => {
  const placeData = {
    position,
    id,
    keywords,
  };
  setPlaceData(placeData);
};

export const generateRandomLocations = (
  center: google.maps.LatLngLiteral,
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

export const generateCircleLocations = (
  center: google.maps.LatLngLiteral,
  radius: number,
  steps: number
) => {
  const sections = Math.floor(radius / steps),
    CirclarStep = 3.14 / 4;
  const randomLocations: Array<{ id: string; lat: number; lng: number }> = [];
  // Generate the MATRIX
  for (let i = 1; i <= sections; i++) {
    for (let j = 0; j <= 2 * 3.14; j += CirclarStep) {
      randomLocations.push({
        id: i.toString() + j.toString(),
        lat: center.lat + (steps / 100000) * i * Math.cos(j),
        lng: center.lng + (steps / 100000) * i * Math.sin(j),
      });
    }
  }
  return randomLocations;
};

export const getPlaceData = async (
  position: google.maps.LatLngLiteral,
  keywords: Array<string>
) => {
  const formattedKeywords = keywords.join("|");
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.lat},${position.lng}&keyword=${formattedKeywords}&type=restaurant&radius=2000&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};
