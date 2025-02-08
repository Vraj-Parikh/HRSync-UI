import { format } from "date-fns";
import { Calendar as CalendarIcon, FileDiff } from "lucide-react";
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
};

export function DateTimePicker({
  value,
  onChange,
  className,
}: DateTimePickerFormProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
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
        <div className="p-3 border-t border-border">
          <TimePicker setDate={onChange} date={value} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
