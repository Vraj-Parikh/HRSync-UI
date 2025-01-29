import React, { ReactNode, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  authentication: boolean;
};
function ProtectedRoute({
  children,
  authentication = true,
}: ProtectedRouteProps) {
  useEffect(() => {}, [authentication]);
  return <div></div>;
}

export default ProtectedRoute;
