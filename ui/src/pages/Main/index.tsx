import { Navigate, Route, Routes } from "react-router-dom";
import Heading from "../../shared/components/Heading";

const Main = () => {
  return (
    <>
      <Heading />
      <Routes>
        <Route index element={<h1>Index</h1>} />
        <Route path="welcome" element={<h1>Welcome</h1>} />
        <Route path="welcome/to" element={<h1>Welcome:)</h1>} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Main;
