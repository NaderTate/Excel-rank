"use client";
const yourhandle = require("countrycitystatejson");
import { languages } from "@/lib/languages";
import { googleDomains } from "@/lib/googleDomains";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AiFillGoogleCircle, AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaTabletAlt } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { PiDeviceMobileSpeaker } from "react-icons/pi";
import { MdOpenInNew } from "react-icons/md";
import { Checkbox, Input } from "@nextui-org/react";

function SearchSimulatorForm() {
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openDomain, setOpenDomain] = useState(false);
  const [searchWords, setSearchWords] = useState("");
  const [safeSearch, setSafeSearch] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [device, setDevice] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const allCountries: {
    shortName: string;
    name: string;
    languages: string[];
  }[] = yourhandle.getCountries();
  const allStates: string[] = yourhandle.getStatesByShort(selectedCountry);
  const allCities: string[] = yourhandle.getCities(
    selectedCountry,
    selectedState
  );
  // get user country
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setSelectedCountry(data.country_code);
      });
  }, []);
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
        <Popover open={openCountry} modal onOpenChange={setOpenCountry}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCountry}
              className="w-[200px]  m-auto"
            >
              {selectedCountry
                ? allCountries.find(
                    (country) => country.shortName === selectedCountry
                  )?.name
                : "select country"}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0 bg-background">
            <Command>
              <CommandInput placeholder="Search a country" />
              <CommandEmpty>Couldn&apos;t find any country...</CommandEmpty>
              <CommandGroup className="overflow-auto">
                {allCountries.map((country, i) => (
                  <CommandItem
                    className="hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    key={i}
                    onSelect={() => {
                      setSelectedCountry(country.shortName);
                      setSelectedLanguage(country.languages[0]);
                      setOpenCountry(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountry === country.shortName
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.name}{" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openState} modal onOpenChange={setOpenState}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openState}
              className="w-[200px]  m-auto"
            >
              {selectedState
                ? allStates?.find((state) => state === selectedState)
                  ? selectedState
                  : "select a state"
                : "select a state"}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0 bg-background">
            <Command>
              <CommandInput placeholder="Search a state" />
              <CommandEmpty>Couldn&apos;t find any state...</CommandEmpty>
              <CommandGroup className="overflow-auto">
                {allStates?.map((state) => (
                  <CommandItem
                    className="hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    key={state}
                    onSelect={() => {
                      setSelectedState(state);
                      setOpenState(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedState === state ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {state}{" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openCity} modal onOpenChange={setOpenCity}>
          <PopoverTrigger asChild disabled={!selectedState}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCity}
              className="w-[200px]  m-auto"
            >
              {selectedCity
                ? allCities?.find((city) => city === selectedCity)
                  ? selectedCity
                  : "select city"
                : "select city"}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0 bg-background">
            <Command>
              <CommandInput placeholder="Search a city" />
              <CommandEmpty>Couldn&apos;t find any city...</CommandEmpty>
              <CommandGroup className="overflow-auto">
                {allCities?.map((city) => (
                  <CommandItem
                    className="hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    key={city}
                    onSelect={() => {
                      setSelectedCity(city);
                      setOpenCity(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCity === city ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city}{" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openLanguage} modal onOpenChange={setOpenLanguage}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openLanguage}
              className="w-[200px]  m-auto"
            >
              {languages?.find(
                (language) => language.symbol === selectedLanguage
              )
                ? selectedLanguage
                : "select a language"}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0 bg-background">
            <Command>
              <CommandInput placeholder="Search a language" />
              <CommandEmpty>Couldn&apos;t find any language...</CommandEmpty>
              <CommandGroup className="overflow-auto">
                {languages?.map((language) => (
                  <CommandItem
                    className="hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    key={language.symbol}
                    onSelect={() => {
                      setSelectedLanguage(language.symbol);
                      setOpenLanguage(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLanguage === language.symbol
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {language.name} ({language.symbol}){" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openDomain} modal onOpenChange={setOpenDomain}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openDomain}
              className="w-[200px]  m-auto"
            >
              {googleDomains?.find((domain) => domain === selectedDomain)
                ? selectedDomain
                : "select a domain"}
              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" h-52 p-0 ">
            <Command className="bg-background">
              <CommandInput placeholder="Search a domain" />
              <CommandEmpty>Couldn&apos;t find any domain...</CommandEmpty>
              <CommandGroup className="overflow-auto">
                {googleDomains?.map((domain) => (
                  <CommandItem
                    className="hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    key={domain}
                    onSelect={() => {
                      setSelectedDomain(domain);
                      setOpenDomain(false);
                    }}
                  >
                    <AiOutlineCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedDomain === domain ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {domain}{" "}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="items-center flex space-x-2  m-auto">
          <Checkbox id="safeSearch" onClick={() => setSafeSearch(!safeSearch)}>
            Safe Search
          </Checkbox>
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 my-5">
        <RiComputerLine
          size={35}
          className={`cursor-pointer transition-colors ${
            device === "pc" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => {
            if (device === "pc") setDevice("");
            else setDevice("pc");
          }}
        />
        <FaTabletAlt
          size={35}
          onClick={() => {
            if (device === "tablet") setDevice("");
            else setDevice("tablet");
          }}
          className={`cursor-pointer transition-colors ${
            device === "tablet" ? "text-blue-600" : "text-gray-500"
          }`}
        />
        <PiDeviceMobileSpeaker
          size={35}
          onClick={() => {
            if (device === "mobile") setDevice("");
            else setDevice("mobile");
          }}
          className={`cursor-pointer transition-colors ${
            device === "mobile" ? "text-blue-600" : "text-gray-500"
          }`}
        />
      </div>
      <div className="flex justify-center gap-2">
        <Button
          className="text-lg my-5"
          disabled={!searchWords}
          onClick={() => {
            const uule = Buffer.from(
              selectedCity + " " + selectedState + " " + selectedCountry
            ).toString("base64");
            window.open(
              `https://www.${
                selectedDomain ? selectedDomain : "google.com"
              }/search?q=${searchWords}&adtest=on&hl=${
                selectedLanguage ? selectedLanguage : "en"
              }&adtest-useragent=${
                device == "pc"
                  ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
                  : device == "tablet"
                  ? "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
                  : device == "mobile"
                  ? "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
                  : ""
              }&gl=${selectedCountry}&uule=${
                selectedCity || selectedState ? uule : ""
              }&safe=${safeSearch ? "high" : "off"}`,
              "_blank"
            );
          }}
        >
          <AiFillGoogleCircle size={20} className="mr-2" /> Search
          <MdOpenInNew className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default SearchSimulatorForm;
