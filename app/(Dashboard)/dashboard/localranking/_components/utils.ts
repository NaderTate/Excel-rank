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
