import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";

type FormFieldCommonProps = {
  fieldName: string;
  labelName: string;
  control: Control;
};
function FormFieldCommon({
  control,
  fieldName,
  labelName,
}: FormFieldCommonProps) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <div className="grid grid-cols-3 items-center gap-4">
            <FormLabel htmlFor={labelName}>{labelName}</FormLabel>
            <Input id={labelName} className="col-span-2 h-8" {...field} />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldCommon;
