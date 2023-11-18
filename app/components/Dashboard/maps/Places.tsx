import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from "use-places-autocomplete";

type PlacesProps = {
  setPlace: (
    position: google.maps.LatLngLiteral,
    id: string,
    suggestedKeywords: Array<string>
  ) => void;
};

export default function Places({ setPlace }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ placeId: val });
    const details: any = await getDetails({ placeId: results[0].place_id });
    const { lat, lng } = await getLatLng(results[0]);
    setPlace({ lat, lng }, details.place_id, details.types);
  };

  return (
    <div className="m-28 p-10 border-teal-300 border rounded-md">
      <h1 className="text-3xl">Search your business 👀</h1>
      <div className="flex justify-center">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          type="text"
          className="rounded-md w-full p-2 outline-1 border border-teal-800 outline-teal-600"
          placeholder="Type your business name"
        />
      </div>
      <ul>
        {data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
          return (
            <li
              key={place_id}
              onClick={() => handleSelect(place_id)}
              className="p-1 hover:bg-gray-200 cursor-pointer"
            >
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
