import { Navigate, Route, Routes } from "react-router-dom";
import Heading from "../../shared/components/Heading";
import Login from "./Login";
import SubmitPage from "./Submit";
import PrivateRoute from "@/hoc/PrivateRoute";

const Main = () => {
  return (
    <>
      <Heading />
      <Routes>
        <Route index element={<h1>Index</h1>} />
        <Route path="login" element={<Login />} />
        <Route
          path="submit"
          element={
            <PrivateRoute>
              <SubmitPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Main;
