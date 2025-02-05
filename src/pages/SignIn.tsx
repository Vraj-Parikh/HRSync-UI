import SignInCard from "@/components/auth/SignInCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { GetErrorMessage } from "@/helpers/utils";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";
import { TAuthApiResponseData, TSignInFormData } from "@/types/Auth";
import { AuthApiResponseSchema, SignInSchema } from "@/validation/Auth";

function SignIn() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInFormData>({ resolver: zodResolver(SignInSchema) });
  const submitHandler = async (data: TSignInFormData) => {
    try {
      const endpoint = "/api/auth/sign-in";
      const resp = await api.post<TAuthApiResponseData>(endpoint, data);
      AuthApiResponseSchema.parse(resp.data);
      const { accessToken } = resp.data;
      // store access token in redux
      toast({
        title: "Logged In",
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = GetErrorMessage(error, "Error Signing in");
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    }
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
