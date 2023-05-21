import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import AuthStore from "../stores/authStore";
import React from "react";

const PrivateRoute: React.FC<React.PropsWithChildren<unknown>> = observer(
  ({ children }) => {
    const { isAuthenticated } = AuthStore;

    if (!isAuthenticated) return <Navigate to="/login" />;

    return <>{children}</>;
  }
);

export default PrivateRoute;
