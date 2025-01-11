import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  value: string | number;
  label: string;
};

interface SelectBoxProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  triggerClassName?: string;
  itemClassName?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  triggerClassName = "w-[120px] sm:w-[180px] focus-visible:ring-0",
  itemClassName = "capitalize font-primary",
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((item, index) => (
          <SelectItem
            key={index}
            value={item.value as string}
            className={itemClassName}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
