import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
const MainLayout = () => {
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
