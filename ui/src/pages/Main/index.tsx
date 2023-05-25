import { Navigate, Route, Routes } from "react-router-dom";
import Heading from "../../shared/components/Heading";
import Login from "./Login";
import UploadPage from "./Upload";
import PrivateRoute from "@/hoc/PrivateRoute";
import Report from "./Report";

const Main = () => {
  return (
    <>
      <Heading />
      <Routes>
        {/* <Route index element={<Navigate to="upload" />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="report/:id" element={<Report />} />
        <Route
          path="upload"
          element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="upload" />} />
      </Routes>
    </>
  );
};

export default Main;
