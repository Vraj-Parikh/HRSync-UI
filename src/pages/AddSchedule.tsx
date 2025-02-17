import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddScheduleForm, {
  TCandidateFields,
} from "../components/AddSchedule/AddScheduleForm";
import { GetErrorMessage } from "@/helpers/utils";
import axios from "axios";
import { ApiResponseSchema } from "@/validation/ApiResponse";
import { type TAddScheduleFormData } from "@/types/Schedule";
import { AddScheduleFormSchema } from "@/validation/Schedule";
import mainApi from "@/config/axiosMain";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const candidateFields: TCandidateFields = [
  {
    name: "candidateFirstName",
    label: "First Name",
    placeholder: "First name",
  },
  {
    name: "candidateLastName",
    label: "Last Name",
    placeholder: "Last name",
  },
  {
    name: "candidateEmail",
    label: "Email",
    placeholder: "Email (optional)",
    type: "email",
  },
  {
    name: "candidateContactNum",
    label: "Contact Number",
    placeholder: "Contact (optional)",
  },
] as const;
function checkIfTimeBeforeOrEqual(startDateTime: Date, endDateTime: Date) {
  const stripSeconds = (date: Date) => new Date(date.setSeconds(0, 0));
  startDateTime = stripSeconds(startDateTime);
  endDateTime = stripSeconds(endDateTime);
  let msg = "";
  if (endDateTime <= startDateTime) {
    msg = "End time could not be before or be equal to start time";
  }
  return msg;
}
type AddScheduleResponseAPI = z.infer<typeof ApiResponseSchema>;
function AddSchedule() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const form = useForm<TAddScheduleFormData>({
    resolver: zodResolver(AddScheduleFormSchema),
    defaultValues: {
      candidateEmail: "",
      candidateContactNum: "",
      candidateFirstName: "",
      candidateLastName: "",
      startDateTime: new Date(),
      endDateTime: new Date(),
    },
  });
  const onSubmit = async (data: TAddScheduleFormData) => {
    const { startDateTime, endDateTime } = data;
    let msg = checkIfTimeBeforeOrEqual(startDateTime, endDateTime);
    if (msg) {
      toast({
        title: msg,
        variant: "destructive",
      });
      return;
    }
    const isInterviewMoreThan12Hour =
      endDateTime.getTime() - startDateTime.getTime() >= 1000 * 60 * 60 * 12;
    if (isInterviewMoreThan12Hour) {
      setShowAlertDialog(true);
      return;
    }
    sendDataAPI();
  };
  const sendDataAPI = async () => {
    try {
      const endpoint = "/api/schedule";
      const data = form.getValues();
      const body = {
        ...data,
        startDateTime: data.startDateTime.toISOString(),
        endDateTime: data.endDateTime.toISOString(),
      };
      await mainApi.post<AddScheduleResponseAPI>(endpoint, body);
      toast({ title: "Schedule added" });
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
  useEffect(() => {
    form.setValue("startDateTime", new Date());
    form.setValue("endDateTime", new Date());
    form.setValue("candidateFirstName", "");
    form.setValue("candidateLastName", "");
    form.setValue("candidateEmail", "");
    form.setValue("candidateContactNum", "");
  }, []);
  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="container max-w-2xl px-1.5 sm:px-4">
        <Card>
          <CardHeader className="pb-3.5">
            <CardTitle className="text-center font-bold text-xl tracking-wide border-b-2 border-black pb-2">
              Schedule Interview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AddScheduleForm
              form={form}
              onSubmit={onSubmit}
              candidateFields={candidateFields}
              submitText="Add Schedule"
            />
          </CardContent>
        </Card>
      </div>
      <AlertDialog
        open={showAlertDialog}
        onOpenChange={(open) => setShowAlertDialog(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Long Schedule Warning</AlertDialogTitle>
            <AlertDialogDescription>
              This schedule exceeds 12 hours. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAlertDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowAlertDialog(false);
                sendDataAPI();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AddSchedule;
