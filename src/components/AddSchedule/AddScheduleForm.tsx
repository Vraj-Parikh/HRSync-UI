import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import type { TAddScheduleFormData } from "@/types/Schedule";
import { Button } from "../ui/button";
import { DateTimePicker } from "../time/date-time-picker";
import { ComponentProps } from "react";

export type TCandidateFields = Array<{
  name: keyof TAddScheduleFormData;
  label: string;
  placeholder?: string;
  type?: ComponentProps<"input">["type"];
}>;
type AddScheduleFormProps = {
  form: UseFormReturn<TAddScheduleFormData>;
  onSubmit: (data: TAddScheduleFormData) => void;
  candidateFields: TCandidateFields;
  submitText?: string;
};
export default function AddScheduleForm({
  form,
  onSubmit,
  candidateFields,
  submitText = "Submit",
}: AddScheduleFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-4 md:gap-16">
          <div className="">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shrink-0" htmlFor="startTime">
                      Start Time
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
                        onChange={field.onChange}
                        value={field.value}
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormMessage className="text-xs mt-0 border-b-2 pb-1 border-red-600" />
          </div>
          <div className="">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shrink-0" htmlFor="endTime">
                      End Time
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
                        onChange={field.onChange}
                        value={field.value}
                        className="w-full"
                      />
                    </FormControl>
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
          {candidateFields.map(
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
                        value={field.value as string}
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
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
