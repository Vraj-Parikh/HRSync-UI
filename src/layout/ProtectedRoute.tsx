import {
  getAuthToken,
  getIsAuthenticated,
  getStatus,
} from "@/redux/slice/AuthSlice";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
  authentication?: boolean;
};
function ProtectedRoute({
  children,
  authentication = false,
}: ProtectedRouteProps) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const status = useSelector(getStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && authentication !== isAuthenticated) {
      navigate("/sign-in");
    } else if (!authentication && authentication !== isAuthenticated) {
      navigate("/dashboard");
    }
  }, [status, isAuthenticated, authentication]);
  if (status === "loading") {
    return <></>;
  }
  if (status === "failed") {
    return <div className="">Something went wrong</div>;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
