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
import { useNavigate } from "react-router-dom";
import { TSignInFormData } from "@/types/Auth";
type SignInProps = {
  submitHandler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<TSignInFormData>;
  errors: FieldErrors<TSignInFormData>;
};
export function SignInCard({ submitHandler, register, errors }: SignInProps) {
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="font-bold tracking-wide text-2xl text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center tracking-wider font-semibold">
          Enter your credentials to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="grid w-full items-center gap-4">
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
            <Button className="mt-4" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <h2 className="text-center">
          Don't have an account?{" "}
          <span
            className="font-bold tracking-wide border-b-2 border-black pb-0.5 cursor-pointer"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </span>
        </h2>
      </CardFooter>
    </Card>
  );
}

export default SignInCard;
