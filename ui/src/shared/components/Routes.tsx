import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <h1>hello world</h1>,
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
