import SignUpCard from "@/components/auth/SignUpCard";
import { useToast } from "@/hooks/use-toast";
import { GetErrorMessage } from "@/helpers/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TAuthApiResponseData, TSignUpFormData } from "@/types/Auth";
import { SignUpSchema } from "@/validation/Auth";
import axios from "axios";
import authApi from "@/config/axiosAuth";

function SignUp() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormData>({ resolver: zodResolver(SignUpSchema) });
  const submitHandler = async (data: TSignUpFormData) => {
    try {
      console.log(data);
      const endpoint = "/api/auth/sign-up";
      await authApi.post<TAuthApiResponseData>(endpoint, data);
      toast({
        title: "Account Created Successfully !!",
      });
      navigate("/dashboard");
    } catch (error: unknown) {
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
      <SignUpCard
        submitHandler={handleSubmit(submitHandler)}
        register={register}
        errors={errors}
      />
    </div>
  );
}

export default SignUp;
