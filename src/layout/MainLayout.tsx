import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "@/types/redux";
import { fetchData, getStatus } from "@/redux/slice/AuthSlice";
const MainLayout = () => {
  const status = useSelector(getStatus);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status]);
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
