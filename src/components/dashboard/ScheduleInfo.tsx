import { useEffect, useState } from "react";
import ScheduleTable, { TScheduleData } from "./ScheduleTable";
import mainApi from "@/config/axiosMain";
import { useAppSelector } from "@/types/redux";
import { getStatus } from "@/redux/slice/AuthSlice";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Filter, Search, X } from "lucide-react";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveDialog } from "../common/responsive-dialog";
import FilterForm from "./FilterForm";

export type TFilters = {
  candidateEmail: string;
  candidateContactNum: string;
  candidateFirstName: string;
  candidateLastName: string;
  startDateTime: Date | null;
  endDateTime: Date | null;
  interviewStatus: string;
};
export function ScheduleInfo() {
  const [data, setData] = useState<TScheduleData[]>([]);
  const [search, setSearch] = useState<string>("");
  const status = useAppSelector(getStatus);
  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState<TFilters>({
    candidateEmail: "",
    candidateContactNum: "",
    candidateFirstName: "",
    candidateLastName: "",
    startDateTime: null,
    endDateTime: null,
    interviewStatus: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const paramsObj: Record<string, string> = {};
      for (let filter in filters) {
        const queryVal = filters[filter as keyof TFilters];
        if (!queryVal) {
          continue;
        }
        if (queryVal instanceof Date) {
          paramsObj[filter] = queryVal.toISOString();
        } else {
          paramsObj[filter] = queryVal;
        }
      }
      const params = new URLSearchParams(paramsObj);
      const endpoint = `/api/schedule?${params.toString()}`;
      const resp = await mainApi.get(endpoint);
      setData(resp.data.schedules);
    } catch (error) {
      // console.error(error);
    }
  };
  useEffect(() => {
    if (status === "success") {
      fetchData();
    }
  }, [status, filters]);
  const onOkClickDelete = async () => {
    if (!selectedScheduleId) {
      return;
    }
    try {
      const data = [selectedScheduleId];
      await onOkClickDeleteSelected(data);
    } catch (error) {
      console.error(error);
    }
  };
  const onOkClickDeleteSelected = async (selectedScheduleIds: string[]) => {
    try {
      const endpoint = "/api/schedule/delete";
      await mainApi.post(endpoint, {
        scheduleIds: selectedScheduleIds,
      });
      setData((prev) =>
        prev.filter((prev) => !selectedScheduleIds.includes(prev.scheduleId))
      );
      toast({
        title: `Schedule${
          selectedScheduleIds.length > 1 ? "s" : ""
        } deleted successfully`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const removeFilter = (filterName: keyof typeof filters) => {
    if (filterName === "startDateTime" || filterName === "endDateTime") {
      setFilters((prev) => ({ ...prev, [filterName]: null }));
    } else {
      setFilters((prev) => ({ ...prev, [filterName]: "" }));
    }
  };
  return (
    <div className="space-y-4 md:space-y-8">
      <div className="flex justify-between gap-2 md:gap-8 items-center">
        <div className="flex items-center border rounded-md shadow-md px-4 flex-grow focus:ring-1 ring-blue-400">
          <Label htmlFor="search">
            <Search color="#000000" />
          </Label>
          <Input
            id="search"
            placeholder="Search"
            className="border-none shadow-none outline-none focus-visible:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value.trim())}
          />
        </div>

        <div className="flex gap-2">
          <Button className="flex" onClick={() => setFilterDialogOpen(true)}>
            <Filter />
            Filters
          </Button>
          <Button className="" onClick={() => navigate("/schedule/add")}>
            Add Schedule
          </Button>
        </div>
        <ResponsiveDialog
          isOpen={filterDialogOpen}
          setIsOpen={setFilterDialogOpen}
          title=""
          showCancelOkBtn={false}
        >
          <FilterForm filters={filters} setFilters={setFilters} />
        </ResponsiveDialog>
      </div>
      <div className="">
        <div className="mb-2 flex gap-1 flex-wrap">
          {Object.keys(filters).map(
            (val) =>
              filters[val as keyof TFilters] && (
                <Button
                  key={val}
                  className="bg-[#F97316] flex items-center"
                  size={"sm"}
                >
                  <h2>{val}</h2>
                  <div
                    className="border rounded-full p-0.5 scale-90"
                    onClick={() => removeFilter(val as keyof TFilters)}
                  >
                    <X size={10} />
                  </div>
                </Button>
              )
          )}
        </div>
        <ScheduleTable
          data={data}
          search={search}
          setSearch={setSearch}
          selectedScheduleId={selectedScheduleId}
          onOkClickDelete={onOkClickDelete}
          setSelectedScheduleId={setSelectedScheduleId}
          onOkClickDeleteSelected={onOkClickDeleteSelected}
        />
      </div>
    </div>
  );
}
