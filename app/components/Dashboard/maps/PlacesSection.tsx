"use client";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from "use-places-autocomplete";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/react";

export default function PlacesSection({ setPlace }: any) {
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [closed, setClosed] = useState<Boolean>(false);

  const handleSelect = async (val: string, main_text: string) => {
    setValue(main_text, false);
    clearSuggestions();
    const results = await getGeocode({ placeId: val });
    const details: any = await getDetails({ placeId: results[0].place_id });
    const { lat, lng } = getLatLng(results[0]);

    setPlace({
      position: { lat, lng },
      id: details.place_id,
      suggestedKeywords: details.types,
    });
  };

  const handleClickOutside = (e: any) => {
    if (e.target.closest("#SearchBox") === null) {
      clearSuggestions();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="my-5 p-2 md:p-10 ">
      <h1 className="text-xl md:text-3xl my-2 font-bold">
        Find your buisness 🔎
      </h1>
      <div id="SearchBox" className="flex justify-center relative">
        <Input
          value={value}
          onValueChange={setValue}
          disabled={!ready}
          type="text"
          radius="full"
          label="Type your business name"
          autoComplete="off"
        />
        <ul className="absolute top-12 w-full bg-content1 rounded-lg shadow-lg z-10 flex flex-col gap-1  shadow-blue-800/10">
          {data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;
            return (
              <li
                key={place_id}
                onClick={() => handleSelect(place_id, main_text)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Accordion */}
      <div className="flex flex-col gap-2 mt-10 shadow-sm border rounded-xl p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <div
            onClick={() => setClosed(!closed)}
            className="flex justify-between items-center cursor-pointer"
          >
            <h1 className="xs:text-lg sm:text-xl font-bold">
              How to find your business?
            </h1>
            <button type="button" className="focus:outline-none">
              <FiChevronDown
                className={`text-2xl transition ${
                  closed ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <AnimatePresence>
            {!closed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2 overflow-hidden"
              >
                <p className="sm:text-lg">
                  <span className="font-bold">Step 1:</span> Type your business
                  name in the search box (it&apos;s the same name at google
                  maps)
                </p>
                <p className="sm:text-lg">
                  <span className="font-bold">Step 2:</span> Select your
                  business from the dropdown
                </p>
                <p className="sm:text-lg">
                  <span className="font-bold">Step 3:</span> Click next
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
