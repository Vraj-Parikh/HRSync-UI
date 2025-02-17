import { DateTimePicker } from "../time/date-time-picker";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { TFilters } from "./ScheduleInfo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewStatusConst } from "@/config/constants";
type FilterFormProps = {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
  defaultTabValue?: string;
};

function FilterForm({
  filters,
  setFilters,
  defaultTabValue = "date",
}: FilterFormProps) {
  const [startDateTime, setStartDateTime] = useState(
    filters.startDateTime || new Date()
  );
  const [endDateTime, setEndDateTime] = useState(
    filters.endDateTime || new Date()
  );
  const [firstName, setFirstName] = useState(filters.candidateFirstName);
  const [lastName, setLastName] = useState(filters.candidateLastName);
  const [email, setEmail] = useState(filters.candidateEmail);
  const [contactNum, setContactNum] = useState(filters.candidateContactNum);
  const [interviewStatus, setInterviewStatus] = useState(
    filters.interviewStatus
  );

  const removeFilter = (filterName: keyof typeof filters) => {
    if (filterName === "startDateTime" || filterName === "endDateTime") {
      setFilters((prev) => ({ ...prev, [filterName]: null }));
    } else {
      setFilters((prev) => ({ ...prev, [filterName]: "" }));
    }
  };
  const addFilterDate = (
    filterName: Extract<keyof typeof filters, "startDateTime" | "endDateTime">,
    filterValue: Date
  ) => {
    setFilters((prev) => ({ ...prev, [filterName]: filterValue }));
  };
  const addFilterString = (
    filterName: Exclude<keyof typeof filters, "startDateTime" | "endDateTime">,
    filterValue: string
  ) => {
    setFilters((prev) => ({ ...prev, [filterName]: filterValue }));
  };
  return (
    <Tabs defaultValue={defaultTabValue} className="w-full">
      <div className="">
        <TabsList className="grid w-full grid-cols-2 rounded-b-none">
          <TabsTrigger value="date">Date</TabsTrigger>
          <TabsTrigger value="interviewStatus">Status</TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-2 rounded-b-none rounded-t-none">
          <TabsTrigger value="candidateFirstName">First Name</TabsTrigger>
          <TabsTrigger value="candidateLastName">Last Name</TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-2 rounded-t-none">
          <TabsTrigger value="candidateEmail">Email</TabsTrigger>
          <TabsTrigger value="candidateContactNum">Contact Number</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="date">
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="startDateTime">Start Date Time</Label>
              <DateTimePicker
                value={startDateTime}
                onChange={(val) => setStartDateTime(val)}
              />
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    setEndDateTime(new Date());
                    removeFilter("startDateTime");
                  }}
                >
                  Remove Filter
                </Button>
                <Button
                  onClick={() => addFilterDate("startDateTime", startDateTime)}
                >
                  Apply Filter
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <Label htmlFor="endDateTime">End Date Time</Label>
              <DateTimePicker
                value={endDateTime}
                onChange={(val) => setEndDateTime(val)}
              />
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    setEndDateTime(new Date());
                    removeFilter("endDateTime");
                  }}
                >
                  Remove Filter
                </Button>
                <Button
                  onClick={() => addFilterDate("endDateTime", endDateTime)}
                >
                  Apply Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="interviewStatus">
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={interviewStatus}
                onValueChange={(val) => setInterviewStatus(val)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {InterviewStatusConst.map((val) => (
                      <SelectItem value={val} key={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  setInterviewStatus("");
                  removeFilter("candidateFirstName");
                }}
              >
                Remove Filter
              </Button>
              <Button
                onClick={() =>
                  addFilterString("interviewStatus", interviewStatus)
                }
              >
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="candidateFirstName">
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  setFirstName("");
                  removeFilter("candidateFirstName");
                }}
              >
                Remove Filter
              </Button>
              <Button
                onClick={() => addFilterString("candidateFirstName", firstName)}
              >
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="candidateLastName">
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  setLastName("");
                  removeFilter("candidateLastName");
                }}
              >
                Remove Filter
              </Button>
              <Button
                onClick={() => addFilterString("candidateLastName", lastName)}
              >
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="candidateEmail">
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  setEmail("");
                  removeFilter("candidateEmail");
                }}
              >
                Remove Filter
              </Button>
              <Button onClick={() => addFilterString("candidateEmail", email)}>
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="candidateContactNum">
        <Card>
          <CardContent className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="contactNum">Contact Number</Label>
              <Input
                id="contactNum"
                value={contactNum}
                onChange={(e) => setContactNum(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => {
                  setContactNum("");
                  removeFilter("candidateContactNum");
                }}
              >
                Remove Filter
              </Button>
              <Button
                onClick={() =>
                  addFilterString("candidateContactNum", contactNum)
                }
              >
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default FilterForm;
