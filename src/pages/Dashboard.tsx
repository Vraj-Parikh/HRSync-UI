import { ScheduleInfo } from "@/components/dashboard/ScheduleInfo";
const Dashboard = () => {
  return (
    <div className="flex-grow container flex justify-center py-4">
      <div className=" w-10/12 md:w-full mx-auto flex justify-center items-center">
        <ScheduleInfo />
      </div>
    </div>
  );
};

export default Dashboard;
