import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GetErrorMessage } from "@/helpers/utils";
import axios from "axios";
import { ApiResponseSchema } from "@/validation/ApiResponse";
import { type TEditScheduleFormData } from "@/types/Schedule";
import { EditScheduleFormSchema } from "@/validation/Schedule";
import mainApi from "@/config/axiosMain";
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
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAppSelector } from "@/types/redux";
import { getStatus } from "@/redux/slice/AuthSlice";
import EditScheduleForm, {
  TCandidateFields,
} from "@/components/EditSchedule/EditScheduleForm";

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

type TScheduleInfo = {
  startDateTime: string;
  endDateTime: string;
  interviewStatus: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidateContactNum: string;
};
export default function EditSchedule() {
  const [scheduleInfo, setScheduleInfo] = useState<TScheduleInfo | null>(null);
  const { scheduleId } = useParams();
  const { toast } = useToast();
  const status = useAppSelector(getStatus);
  const navigate = useNavigate();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const form = useForm<TEditScheduleFormData>({
    resolver: zodResolver(EditScheduleFormSchema),
    defaultValues: {
      candidateFirstName: "",
      candidateLastName: "",
      candidateEmail: "",
      candidateContactNum: "",
      startDateTime: new Date(),
      endDateTime: new Date(),
      interviewStatus: "PENDING",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `/api/schedule/byId?scheduleId=${scheduleId}`;
        const resp = await mainApi.get(endpoint);
        // console.log(resp.data.schedule);
        setScheduleInfo(resp.data.schedule);
      } catch (error) {
        console.log(error);
      }
    };
    if (status === "success") {
      fetchData();
    }
  }, []);
  const onSubmit = async (data: TEditScheduleFormData) => {
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
        scheduleId,
        ...data,
        startDateTime: data.startDateTime.toISOString(),
        endDateTime: data.endDateTime.toISOString(),
      };
      await mainApi.put<AddScheduleResponseAPI>(endpoint, body);
      toast({ title: "Schedule Updated" });
      navigate("/dashboard");
    } catch (error) {
      // console.error(error);
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
    if (!scheduleInfo) {
      return;
    }
    form.reset({
      startDateTime: new Date(scheduleInfo.startDateTime),
      endDateTime: new Date(scheduleInfo.endDateTime),
      candidateFirstName: scheduleInfo.candidateFirstName,
      candidateLastName: scheduleInfo.candidateLastName,
      candidateEmail: scheduleInfo.candidateEmail || "",
      candidateContactNum: scheduleInfo.candidateContactNum || "",
      interviewStatus: scheduleInfo.interviewStatus as
        | "PENDING"
        | "FINISHED"
        | "NO-SHOW"
        | "REJECTED"
        | "SELECTED"
        | "HOLD",
    });
  }, [scheduleInfo]);
  if (!scheduleInfo) {
    return <></>;
  }
  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="container max-w-2xl px-1.5 sm:px-4">
        <Card>
          <CardHeader className="pb-3.5">
            <CardTitle className="text-center font-bold text-xl tracking-wide border-b-2 border-black pb-2">
              Edit Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EditScheduleForm
              form={form}
              onSubmit={onSubmit}
              candidateFields={candidateFields}
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
