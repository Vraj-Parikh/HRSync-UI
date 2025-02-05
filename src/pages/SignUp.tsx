import SignUpCard from "@/components/auth/SignUpCard";
import { useToast } from "@/hooks/use-toast";
import { GetErrorMessage } from "@/helpers/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";
import { TAuthApiResponseData, TSignUpFormData } from "@/types/Auth";
import { AuthApiResponseSchema, SignUpSchema } from "@/validation/Auth";

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
      const endpoint = "/api/auth/sign-up";
      const resp = await api.post<TAuthApiResponseData>(endpoint, data);
      AuthApiResponseSchema.parse(resp.data);
      const { accessToken } = resp.data;
      //store in redux
      toast({
        title: "Account Created Successfully !!",
      });
      navigate("/dashboard");
    } catch (error: unknown) {
      const errorMessage = GetErrorMessage(error, "Could not sign up");
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
