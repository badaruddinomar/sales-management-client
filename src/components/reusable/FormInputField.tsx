import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  height?: string;
  defaultValue?: number;
}

const FormInputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  height = "50px",
  defaultValue,
}: FormInputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="font-primary mb-[10px]">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              {...(type === "number" ? { min: 0 } : {})}
              {...(defaultValue && { defaultValue })}
              className={`h-[var(--ctmHeight)] font-primary focus-visible:ring-0 `}
              style={{ "--ctmHeight": height } as React.CSSProperties}
            />
          </FormControl>
          <FormMessage className="font-primary" />
        </FormItem>
      )}
    />
  );
};

export default FormInputField;
