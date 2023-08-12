import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Heading from "../../shared/components/Heading";
import Login from "./Login";
import UploadPage from "./Upload";
import PrivateRoute from "@/hoc/PrivateRoute";
import Report from "./Report";
import MobileNav from "@/components/MobileNav";
import Dashboard from "./Dashboard";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Main = () => {
  const location = useLocation();
  return (
    <>
      <Heading />
      <SwitchTransition>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
          unmountOnExit
        >
          <Routes location={location}>
            {/* <Route index element={<Navigate to="upload" />} /> */}
            <Route path="login" element={<Login />} />
            <Route
              path="report/:id"
              element={
                <PrivateRoute>
                  <Report />
                </PrivateRoute>
              }
            />
            <Route path="preview/:id" element={<Report />} />
            <Route
              path="upload"
              element={
                <PrivateRoute>
                  <UploadPage />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="dashboard" />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
      <div className="visible md:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default Main;
