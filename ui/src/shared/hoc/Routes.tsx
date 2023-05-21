import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Main from "../../pages/Main";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Main />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
