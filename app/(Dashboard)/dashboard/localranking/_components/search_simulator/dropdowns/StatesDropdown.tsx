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
  selectedState: string;
  setSelectedState: (state: string) => void;
  allStates: string[];
};

const StatesDropdown = ({
  allStates,
  selectedState,
  setSelectedState,
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
                  setOpen(false);
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
  );
};

export default StatesDropdown;
