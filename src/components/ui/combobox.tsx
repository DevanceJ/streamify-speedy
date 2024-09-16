"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMonthStore, useStore } from "@/store/stateStore";

const months = [
  {
    value: "January",
    label: "January, 2024",
  },
  {
    value: "February",
    label: "February, 2024",
  },
  {
    value: "March",
    label: "March, 2024",
  },
  {
    value: "April",
    label: "April, 2024",
  },
  {
    value: "May",
    label: "May, 2024",
  },
  {
    value: "June",
    label: "June, 2024",
  },
  {
    value: "July",
    label: "July, 2024",
  },
  {
    value: "August",
    label: "August, 2024",
  },
  {
    value: "September",
    label: "September, 2024",
  },
  {
    value: "October",
    label: "October, 2024",
  },
];

export function ComboboxMonth() {
  const [open, setOpen] = React.useState(false);
  const { currentMonth, setCurrentMonth } = useMonthStore();
  const { darkMode, setDarkMode } = useStore();

  return (
    <div className=" flex items-center gap-4 justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between">
            {currentMonth
              ? months.find((framework) => framework.value === currentMonth)
                  ?.label
              : "Select month..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search month..." className="h-9" />
            <CommandList>
              <CommandEmpty>Not found.</CommandEmpty>
              <CommandGroup>
                {months.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => {
                      if (framework.value !== currentMonth) {
                        setCurrentMonth(framework.value);
                      }
                      setOpen(false);
                    }}>
                    {framework.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 ",
                        currentMonth === framework.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="sm:flex hidden"
        variant="outline"
        onClick={() => {
          setDarkMode(!darkMode);
          document.body.classList.toggle("dark");
        }}>
        {darkMode ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
