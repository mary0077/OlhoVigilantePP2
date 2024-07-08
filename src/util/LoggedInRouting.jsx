import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./AuthenticationService";

export const LoggedInRouting = ({ children, path }) => {
  if (isUserLoggedIn()) {
    // user should not access if logged in
    return <Navigate to="/" />;
  }

  return children;
};
