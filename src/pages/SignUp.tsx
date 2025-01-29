import SignUpCard from "@/components/auth/SignUpCard";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "@/validation/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export type SignUpFormData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  contact_no: string;
};
const SignUpSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
  first_name: nameValidator,
  last_name: nameValidator,
  contact_no: z.string(),
});
function SignUp() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(SignUpSchema) });
  const submitHandler = (data: SignUpFormData) => {
    console.log(data);
  };
  return (
    <div className="flex flex-grow justify-center items-center border">
      <SignUpCard
        submitHandler={handleSubmit(submitHandler)}
        register={register}
        errors={errors}
      />
    </div>
  );
}

export default SignUp;
