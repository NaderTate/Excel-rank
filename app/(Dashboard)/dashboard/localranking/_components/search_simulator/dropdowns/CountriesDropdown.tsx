import { useState } from "react";

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
import { Button } from "@/components/ui/button";

import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";

import { cn } from "@/lib/utils";

type Props = {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  setSelectedLanguage: (language: string) => void;
  allCountries: {
    shortName: string;
    name: string;
    languages: string[];
  }[];
};

const CountriesDropdown = ({
  selectedCountry,
  setSelectedCountry,
  setSelectedLanguage,
  allCountries,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} modal onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
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
            {allCountries.map((country) => (
              <CommandItem
                className="hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                key={country.shortName}
                onSelect={() => {
                  setSelectedCountry(country.shortName);
                  setSelectedLanguage(country.languages[0]);
                  setOpen(false);
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
  );
};

export default CountriesDropdown;
