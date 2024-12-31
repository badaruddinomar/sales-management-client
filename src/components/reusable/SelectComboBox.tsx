"use client";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface IComboBoxProps {
  value: string;
  dataArr: { label: string; value: string }[];
  onChange: (value: string) => void;
  title: string;
  height?: string;
}

const SelectComboBox = ({
  title,
  value,
  dataArr = [],
  onChange,
  height = "50px",
}: IComboBoxProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          onClick={() => setOpen(!open)}
          className={cn(
            `h-[var(--ctmHeight)] justify-between w-full`,
            !value && "text-muted-foreground"
          )}
          style={{ "--ctmHeight": height } as React.CSSProperties}
        >
          {value
            ? dataArr.find((data) => data.value === value)?.label
            : `Select ${title}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height p-0 z-[10000]">
        <Command className="w-full">
          <CommandInput placeholder={`Search ${title}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {title} found.</CommandEmpty>
            <CommandGroup>
              {dataArr.map((data) => (
                <CommandItem
                  value={data.label}
                  key={data.value}
                  onSelect={() => {
                    onChange(data.value);
                    setOpen(false);
                  }}
                >
                  {data.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectComboBox;
