import { useState } from "react";

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

import { AiOutlineCheck } from "react-icons/ai";
import { LuChevronsUpDown } from "react-icons/lu";

import { cn } from "@/lib/utils";

import { googleDomains } from "@/app/(Dashboard)/dashboard/localranking/googleDomains";

type Props = {
  selectedDomain: string;
  setSelectedDomain: (domain: string) => void;
};

const DomainsDropdown = ({ selectedDomain, setSelectedDomain }: Props) => {
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
                  setOpen(false);
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
  );
};

export default DomainsDropdown;
