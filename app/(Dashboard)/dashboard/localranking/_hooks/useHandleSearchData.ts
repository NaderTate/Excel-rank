"use client";

import { useEffect, useState } from "react";

const yourhandle = require("countrycitystatejson");

export const useHandleSearchData = () => {
  const [searchWords, setSearchWords] = useState("");

  const [locationData, setLocationData] = useState({
    country: "",
    state: "",
    city: "",
  });

  const [options, setOptions] = useState({
    language: "",
    device: "",
    domain: "",
    safeSearch: false,
  });

  const allCountries: {
    shortName: string;
    name: string;
    languages: string[];
  }[] = yourhandle.getCountries();

  const allStates: string[] = yourhandle.getStatesByShort(locationData.country);

  const allCities: string[] = yourhandle.getCities(
    locationData.country,
    locationData.state
  );

  // get user country
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setLocationData((prev) => ({
          ...prev,
          country: data.country_code,
        }));
      });
  }, []);

  const onSubmit = () => {
    const uule = Buffer.from(
      locationData.city + " " + locationData.state + " " + locationData.country
    ).toString("base64");

    window.open(
      `https://www.${
        options.domain ?? "google.com"
      }/search?q=${searchWords}&adtest=on&hl=${
        options.language ?? "en"
      }&adtest-useragent=${
        options.device == "pc"
          ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
          : options.device == "tablet"
          ? "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
          : options.device == "mobile"
          ? "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
          : ""
      }&gl=${locationData.country}&uule=${
        locationData.city || locationData.state ? uule : ""
      }&safe=${options.safeSearch ? "high" : "off"}`,
      "_blank"
    );
  };

  return {
    searchWords,
    setSearchWords,
    locationData,
    setLocationData,
    allCountries,
    allStates,
    allCities,
    options,
    setOptions,
    onSubmit,
  };
};
