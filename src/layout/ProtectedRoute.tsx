import { getIsAuthenticated, getStatus } from "@/redux/slice/AuthSlice";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/common/Spinner";
import { useAppSelector } from "@/types/redux";

type ProtectedRouteProps = {
  children: ReactNode;
  authentication?: boolean;
};
function ProtectedRoute({
  children,
  authentication = false,
}: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const status = useAppSelector(getStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (status != "success") {
      return;
    }
    if (authentication && authentication !== isAuthenticated) {
      navigate("/sign-in");
    } else if (!authentication && authentication !== isAuthenticated) {
      navigate("/dashboard");
    }
  }, [status, isAuthenticated, authentication]);
  if (status === "loading") {
    return (
      <div className="flex flex-grow justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (status === "failed") {
    return <div className="">Something went wrong</div>;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
