import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "./time-picker";
import { ComponentProps } from "react";

type DateTimePickerFormProps = {
  value: Date;
  onChange: (...event: any[]) => void;
  className?: ComponentProps<"button">["className"];
  width?: string;
  open?: boolean;
};

export function DatePicker({
  value,
  onChange,
  className,
  width = "280px",
  open,
}: DateTimePickerFormProps) {
  const widthVal = `w-[${width}]`;
  return (
    <Popover {...(open ? { open } : {})}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal border-black",
            !value && "text-muted-foreground",
            className,
            widthVal
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
