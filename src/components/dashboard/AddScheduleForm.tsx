import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactValidator, nameValidator } from "@/validation/Form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ComponentProps } from "react";

const FormSchema = z.object({
  time_slot_id: z.string({ message: "Please Select Time Slot" }).nonempty(),
  first_name: nameValidator,
  last_name: nameValidator,
  email: z.string().email(),
  contact_no: contactValidator,
});
export type AddScheduleFormData = z.infer<typeof FormSchema>;

type TSelectOptions = {
  title: string;
  value: string;
};
type AddSchedulePopOverProps = {
  selectionOptions: TSelectOptions[];
};
type TCandidateFields = Array<{
  name: keyof AddScheduleFormData;
  label: string;
  placeholder?: string;
  type?: ComponentProps<"input">["type"];
}>;
const CandidateFields: TCandidateFields = [
  {
    name: "first_name",
    label: "First Name",
    placeholder: "First name",
  },
  {
    name: "last_name",
    label: "Last Name",
    placeholder: "Last name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email (optional)",
    type: "email",
  },
  {
    name: "contact_no",
    label: "Contact Number",
    placeholder: "Contact (optional)",
  },
] as const;

export default function AddScheduleForm({
  selectionOptions = [],
}: AddSchedulePopOverProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      contact_no: "",
      first_name: "",
      last_name: "",
      time_slot_id: "",
    },
  });
  const onSubmit = (data: AddScheduleFormData) => {
    console.log(data);
  };
  if (selectionOptions.length === 0) {
    return <Button>Add Schedule</Button>;
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Add Schedule</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="time_slot_id"
                render={({ field }) => (
                  <FormItem>
                    {form.formState.errors.time_slot_id ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild className="cursor-pointer">
                            <FormLabel>Time Slot</FormLabel>
                          </TooltipTrigger>
                          <TooltipContent>
                            <FormMessage />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <FormLabel>Time Slot</FormLabel>
                    )}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Time Slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectionOptions.map(({ title, value }) => (
                          <SelectItem value={value} key={value}>
                            {title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Separator />
              <h2 className="text-center font-bold tracking-wider">
                Candidate Details
              </h2>
              {CandidateFields.map(
                ({ label, name, placeholder, type = "text" }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-3 items-center gap-4">
                          {form.formState.errors[name] ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger
                                  asChild
                                  className="cursor-pointer"
                                >
                                  <FormLabel>{label}</FormLabel>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <FormMessage />
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <FormLabel>{label}</FormLabel>
                          )}
                          <Input
                            id={name}
                            className="col-span-2 h-8"
                            placeholder={placeholder}
                            type={type}
                            {...field}
                          />
                        </div>
                      </FormItem>
                    )}
                  />
                )
              )}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
