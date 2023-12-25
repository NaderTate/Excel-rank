"use client";

import { Checkbox, Input } from "@nextui-org/react";

import SelectDevice from "./SelectDevice";
import { Button } from "@/components/ui/button";
import StatesDropdown from "./dropdowns/StatesDropdown";
import CitiesDropdown from "./dropdowns/CitiesDropdown";
import DomainsDropdown from "./dropdowns/DomainsDropdown";
import LanguagesDropdown from "./dropdowns/LanguagesDropdown";
import CountriesDropdown from "./dropdowns/CountriesDropdown";

import { AiFillGoogleCircle } from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";

import { useHandleSearchData } from "../../_hooks/useHandleSearchData";

function SearchSimulatorForm() {
  const {
    searchWords,
    setSearchWords,
    locationData,
    setLocationData,
    options,
    setOptions,
    allCountries,
    allStates,
    allCities,
    onSubmit,
  } = useHandleSearchData();
  return (
    <div className="mt-24 max-w-xl m-auto">
      <h1 className="text-lg text-center font-bold">Google Search Simulator</h1>
      <p className="text-center text-lg font-semibold">
        Google search simulator is a tool that helps you check your site and
        google ads SEO performance in any country in the world
      </p>
      <Input
        variant="bordered"
        label="Type your keywords..."
        className="my-5"
        onValueChange={setSearchWords}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-10">
        <CountriesDropdown
          allCountries={allCountries}
          selectedCountry={locationData.country}
          setSelectedCountry={(country) => {
            setLocationData({ ...locationData, country: country });
          }}
          setSelectedLanguage={(language) => {
            setOptions({ ...options, language });
          }}
        />
        <StatesDropdown
          allStates={allStates}
          selectedState={locationData.state}
          setSelectedState={(state) => {
            setLocationData({ ...locationData, state });
          }}
        />
        <CitiesDropdown
          selectedState={locationData.state}
          allCities={allCities}
          selectedCity={locationData.city}
          setSelectedCity={(city) => {
            setLocationData({ ...locationData, city });
          }}
        />
        <LanguagesDropdown
          selectedLanguage={options.language}
          setSelectedLanguage={(language) => {
            setOptions({ ...options, language });
          }}
        />
        <DomainsDropdown
          selectedDomain={options.domain}
          setSelectedDomain={(domain) => {
            setOptions({ ...options, domain });
          }}
        />
        <div className="items-center flex space-x-2  m-auto">
          <Checkbox
            id="safeSearch"
            onClick={() =>
              setOptions({ ...options, safeSearch: !options.safeSearch })
            }
          >
            Safe Search
          </Checkbox>
        </div>
      </div>
      <SelectDevice
        device={options.device}
        setDevice={(device) => {
          setOptions({ ...options, device });
        }}
      />
      <div className="flex justify-center gap-2">
        <Button
          className="text-lg my-5"
          disabled={!searchWords}
          onClick={onSubmit}
        >
          <AiFillGoogleCircle size={20} className="mr-2" /> Search
          <MdOpenInNew className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default SearchSimulatorForm;
