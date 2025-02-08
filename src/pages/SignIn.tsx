import SignInCard from "@/components/auth/SignInCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { GetErrorMessage } from "@/helpers/utils";
import { useNavigate } from "react-router-dom";
import { TAuthApiResponseData, TSignInFormData } from "@/types/Auth";
import { SignInSchema } from "@/validation/Auth";
import axios from "axios";
import authApi from "@/config/axiosAuth";

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
      await authApi.post<TAuthApiResponseData>(endpoint, data);
      toast({
        title: "Logged In",
      });
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = "";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.msg;
      } else {
        errorMessage = GetErrorMessage(error, "Error Signing in");
      }
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
