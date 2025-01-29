import { ReactNode } from "react";

type ErrorTextProps = {
  children: ReactNode;
};
const ErrorText = ({ children }: ErrorTextProps) => {
  return <p className="text-red-600 text-sm">{children}</p>;
};

export default ErrorText;
