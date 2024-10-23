import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout"; // หากมี Layout
import Login from "../pages/Login"; // นำเข้า Login page
import Register from "../pages/Register";
import EditStore from "../components/EditStore";
import App from "../App";
import AddStore from "../components/AddStore";
import StoreTable from "../components/StoreTable";
import NotAllowed from "./../pages/NotAllowed";
import ModOrAdmin from "../pages/ModOrAdminPage";
import Home from "../pages/dashboard/Home";
import UserProfilePage from "./../pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/app",
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
        path: "/userprofilepage",
        element: <UserProfilePage />,
      },
      {
        path: "/editstore/store/:id",
        element: (
          <ModOrAdmin>
            <EditStore />
          </ModOrAdmin>
        ),
      },
      {
        path: "/addstore",
        element: (
          <ModOrAdmin>
            <AddStore />
          </ModOrAdmin>
        ),
      },
      {
        path: "/storetable",
        element: <StoreTable />,
      },
      {
        path: "/notallowed",
        element: <NotAllowed />,
      },
    ],
  },
]);

export default router;
