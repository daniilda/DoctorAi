import { Navigate, Route, Routes } from "react-router-dom";
import Heading from "../../shared/components/Heading";
import Login from "../Login";

const Main = () => {
  return (
    <>
      <Heading />
      <Routes>
        <Route index element={<h1>Index</h1>} />
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Main;
