import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout"; // หากมี Layout
import Login from "../pages/Login"; // นำเข้า Login page
import Register from "../pages/Register";
import EditStore from "../components/EditStore";
import App from "../App";
import AddStore from "../components/AddStore";
import StoreTable from "../components/StoreTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/editstore/store/:id",
        element: <EditStore />,
      },
      {
        path: "/addstore",
        element: <AddStore />,
      },
      {
        path: "/storetable",
        element: <StoreTable />,
      },
    ],
  },
]);

export default router;
