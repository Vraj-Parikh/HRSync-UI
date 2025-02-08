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
import { ComponentProps, useEffect } from "react";
import type { ScheduleFormData } from "@/types/Schedule";
import { Button } from "../ui/button";
import { DateTimePicker } from "../time/date-time-picker";

type TCandidateFields = Array<{
  name: keyof ScheduleFormData;
  label: string;
  placeholder?: string;
  type?: ComponentProps<"input">["type"];
}>;
const CandidateFields: TCandidateFields = [
  {
    name: "candidateFirstName",
    label: "First Name",
    placeholder: "First name",
  },
  {
    name: "candidateLastName",
    label: "Last Name",
    placeholder: "Last name",
  },
  {
    name: "candidateEmail",
    label: "Email",
    placeholder: "Email (optional)",
    type: "email",
  },
  {
    name: "candidateContactNum",
    label: "Contact Number",
    placeholder: "Contact (optional)",
  },
] as const;

type AddScheduleFormProps = {
  form: UseFormReturn<ScheduleFormData>;
  onSubmit: (data: ScheduleFormData) => void;
};
export default function AddScheduleForm({
  form,
  onSubmit,
}: AddScheduleFormProps) {
  useEffect(() => {
    form.setValue("startDateTime", new Date());
    form.setValue("endDateTime", new Date());
    form.setValue("candidateFirstName", "");
    form.setValue("candidateLastName", "");
    form.setValue("candidateEmail", "");
    form.setValue("candidateContactNum", "");
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-4 md:gap-16">
          <div className="">
            <div className="space-y-1">
              <FormLabel className="shrink-0" htmlFor="startTime">
                Start Time
              </FormLabel>
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem>
                    <DateTimePicker
                      onChange={field.onChange}
                      value={field.value}
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
            </div>
            <FormMessage className="text-xs mt-0 border-b-2 pb-1 border-red-600" />
          </div>
          <div className="">
            <div className="space-y-1">
              <FormLabel className="shrink-0" htmlFor="endTime">
                End Time
              </FormLabel>
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem>
                    <DateTimePicker
                      onChange={field.onChange}
                      value={field.value}
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
            </div>
            <FormMessage className="text-xs mt-0 border-b-2 pb-1 border-red-600" />
          </div>
        </div>
        <Separator className="my-3 sm:my-4" />
        <h2 className="text-center text-lg font-semibold tracking-wider">
          Candidate Details
        </h2>
        <div className="space-y-1 mt-2">
          {CandidateFields.map(
            ({ label, name, placeholder, type = "text" }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <div className="grid grid-cols-3 items-center gap-1.5 sm:gap-4">
                      <FormLabel className="text-black" htmlFor={name}>
                        {label}
                      </FormLabel>
                      <Input
                        id={name}
                        className="col-span-3 sm:col-span-2 h-8"
                        placeholder={placeholder}
                        type={type}
                        onChange={field.onChange}
                      />
                    </div>

                    <FormMessage>Error Placeholder</FormMessage>
                  </FormItem>
                )}
              />
            )
          )}
        </div>
        <Button type="submit" className="w-full sm:mt-4">
          Add Schedule
        </Button>
      </form>
    </Form>
  );
}
