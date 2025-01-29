import SignInCard from "@/components/auth/SignInCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailValidator, passwordValidator } from "@/validation/Form";
import axios from "axios";
import { ApiResponseSchema } from "@/validation/ApiResponse";
import { useToast } from "@/hooks/use-toast";
import { GetErrorMessage } from "@/helpers/utils";
import { useNavigate } from "react-router-dom";
const SignInSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});
export type SignInFormData = z.infer<typeof SignInSchema>;
const SignInApiResponseSchema = ApiResponseSchema.extend({
  token: z.string().nonempty(),
});
type SignInResponseAPI = z.infer<typeof SignInApiResponseSchema>;

function SignIn() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: zodResolver(SignInSchema) });
  const submitHandler = async (data: SignInFormData) => {
    try {
      console.log(data);
      const endpoint = "http://localhost:8000/api/auth/sign-in";
      const headers = {};
      const resp = await axios.post<SignInResponseAPI>(endpoint, data, {
        headers: {
          ...headers,
        },
      });
      SignInApiResponseSchema.parse(resp.data);
      const { token } = resp.data;
      localStorage.setItem("token", token);
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
