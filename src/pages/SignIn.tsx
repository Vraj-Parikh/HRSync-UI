import SignInCard from "@/components/auth/SignInCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailValidator, passwordValidator } from "@/validation/Form";
const SignInSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});
export type SignInFormData = {
  email: string;
  password: string;
};
function SignIn() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: zodResolver(SignInSchema) });
  const submitHandler = (data: SignInFormData) => {
    console.log(data);
  };
  return (
    <div className="flex flex-grow justify-center items-center border">
      <SignInCard
        submitHandler={handleSubmit(submitHandler)}
        register={register}
        errors={errors}
      />
    </div>
  );
}

export default SignIn;
