import SignUpCard from "@/components/auth/SignUpCard";
import { useToast } from "@/hooks/use-toast";
import { GetErrorMessage } from "@/helpers/utils";
import {
  contactValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from "@/validation/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ApiResponseSchema } from "@/validation/ApiResponse";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  contact_no: contactValidator,
});

const SignUpApiResponseSchema = ApiResponseSchema.extend({
  id: z.string().nonempty(),
});
type SignUpResponseAPI = z.infer<typeof SignUpApiResponseSchema>;
function SignUp() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(SignUpSchema) });
  const submitHandler = async (data: SignUpFormData) => {
    try {
      const endpoint = "localhost:8000/api/auth/sign-up";
      const headers = {};
      const resp = await axios.post<SignUpResponseAPI>(endpoint, data, {
        headers: {
          ...headers,
        },
      });
      SignUpApiResponseSchema.parse(resp.data);
      toast({
        title: "Account Created Successfully !!",
      });
      navigate("/sign-in");
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
