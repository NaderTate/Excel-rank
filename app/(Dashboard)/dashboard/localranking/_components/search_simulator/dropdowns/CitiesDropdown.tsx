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
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  allCities: string[];
  selectedState: string;
};

const CitiesDropdown = ({
  selectedState,
  setSelectedCity,
  selectedCity,
  allCities,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} modal onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={!selectedState}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
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
                  setOpen(false);
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
  );
};

export default CitiesDropdown;
