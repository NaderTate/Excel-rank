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

import { languages } from "@/lib/languages";

type Props = {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
};

const LanguagesDropdown = ({
  selectedLanguage,
  setSelectedLanguage,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} modal onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] m-auto"
        >
          {languages?.find((language) => language.symbol === selectedLanguage)
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
                  setOpen(false);
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
  );
};

export default LanguagesDropdown;
