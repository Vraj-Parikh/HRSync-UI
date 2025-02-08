import { ScheduleInfo } from "@/components/dashboard/ScheduleInfo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-grow container flex justify-center py-4">
      <div className="">
        <ScheduleInfo />
        <Button className="w-full" onClick={() => navigate("/add-schedule")}>
          Add Schedule
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
