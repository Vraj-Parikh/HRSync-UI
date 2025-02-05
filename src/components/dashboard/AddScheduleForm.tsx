import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ComponentProps } from "react";
import { TimePicker } from "rsuite";
import "rsuite/TimePicker/styles/index.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddScheduleFormData } from "./AddSchedule";

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
    // type: "email",
  },
  {
    name: "contact_no",
    label: "Contact Number",
    placeholder: "Contact (optional)",
  },
] as const;

type AddScheduleFormProps = {
  form: UseFormReturn<AddScheduleFormData>;
  onSubmit: (data: AddScheduleFormData) => void;
};
export default function AddScheduleForm({
  form,
  onSubmit,
}: AddScheduleFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant="outline">Add Schedule</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Time Slot</DialogTitle>
          <DialogDescription>
            Add time slot when candidate is being interviewed
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-2">
                  {form.formState.errors.start_time ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild className="cursor-pointer">
                          <FormLabel className="shrink-0">Start Time</FormLabel>
                        </TooltipTrigger>
                        <TooltipContent>
                          <FormMessage />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <FormLabel className="shrink-0">Start Time</FormLabel>
                  )}
                  <TimePicker
                    format="HH:mm"
                    onChange={field.onChange}
                    value={field.value}
                    className="col-span-2"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 gap-2 items-center">
                  {form.formState.errors.end_time ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild className="cursor-pointer">
                          <FormLabel className="shrink-0">End Time</FormLabel>
                        </TooltipTrigger>
                        <TooltipContent>
                          <FormMessage />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <FormLabel className="shrink-0">End Time</FormLabel>
                  )}
                  <TimePicker
                    format="HH:mm"
                    onChange={field.onChange}
                    value={field.value}
                    className="col-span-2"
                  />
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
                          onChange={field.onChange}
                        />
                      </div>
                    </FormItem>
                  )}
                />
              )
            )}
            <DialogFooter>
              <Button type="submit">Add Schedule</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
