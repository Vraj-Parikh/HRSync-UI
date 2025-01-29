import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorText from "../common/ErrorText";
import { SignUpFormData } from "@/pages/SignUp";
import { useNavigate } from "react-router-dom";

type SignInProps = {
  submitHandler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
};
export function SignUpCard({ submitHandler, register, errors }: SignInProps) {
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="font-bold tracking-wide text-2xl text-center">
          Sign Up
        </CardTitle>
        <CardDescription className="text-center tracking-wider font-semibold">
          Create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="grid w-full items-center gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  placeholder="Enter your First Name"
                  type="text"
                  {...register("first_name", { required: true })}
                />
                {errors.first_name && (
                  <ErrorText>{errors.first_name?.message}</ErrorText>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  placeholder="Enter your Last Name"
                  type="text"
                  {...register("last_name", { required: true })}
                />
                {errors.last_name && (
                  <ErrorText>{errors.last_name?.message}</ErrorText>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your Email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && <ErrorText>{errors.email?.message}</ErrorText>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <ErrorText>{errors.password?.message}</ErrorText>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contact_no">Contact Number</Label>
              <Input
                id="contact_no"
                placeholder="Enter your Contact Number"
                type="text"
                {...register("contact_no", { required: true })}
              />
              {errors.contact_no && (
                <ErrorText>{errors.contact_no?.message}</ErrorText>
              )}
            </div>
            <Button className="mt-4" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <h2 className="text-center">
          Already have an account?{" "}
          <span
            className="font-bold tracking-wide border-b-2 border-black pb-0.5 cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </span>
        </h2>
      </CardFooter>
    </Card>
  );
}

export default SignUpCard;
