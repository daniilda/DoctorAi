import { Navigate, Route, Routes } from "react-router-dom";
import Heading from "../../shared/components/Heading";
import Login from "./Login";
import UploadPage from "./Upload";
import PrivateRoute from "@/hoc/PrivateRoute";

const Main = () => {
  return (
    <>
      <Heading />
      <Routes>
        <Route index element={<h1>Index</h1>} />
        <Route path="login" element={<Login />} />
        <Route
          path="upload"
          element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
};

export default Main;
