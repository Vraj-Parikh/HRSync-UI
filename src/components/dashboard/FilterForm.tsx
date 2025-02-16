import { DateTimePicker } from "../time/date-time-picker";
import { TCandidateFields } from "@/pages/AddSchedule";
import { type TEditScheduleFormData } from "@/types/Schedule";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { setDate } from "date-fns";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { TFilters } from "./ScheduleInfo";

type FilterFormProps = {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
};

function FilterForm({ filters, setFilters }: FilterFormProps) {
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
  console.log(filters);
  return (
    <Tabs defaultValue="date" className="w-full">
      <div className="">
        <TabsList className="grid w-full grid-cols-2 rounded-b-none">
          <TabsTrigger value="date">Date</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-2 rounded-b-none rounded-t-none">
          <TabsTrigger value="firstName">First Name</TabsTrigger>
          <TabsTrigger value="lastName">Last Name</TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-2 rounded-t-none">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="contactNum">Contact Number</TabsTrigger>
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
      <TabsContent value="firstName">
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
      <TabsContent value="lastName">
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
      <TabsContent value="email">
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
      <TabsContent value="contactNum">
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
