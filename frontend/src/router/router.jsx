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
    path: "/", // ตั้งค่า path เป็น "/"
    element: <Layout />, // ใช้ Layout
    children: [
      {
        path: "/",
        element: <App />,
      },

      {
        path: "/login", // เส้นทางสำหรับหน้า Login
        element: <Login />,
      },
      {
        path: "/register", // เส้นทางสำหรับหน้า Login
        element: <Register />,
      },
      {
        path: "/editstore", // เส้นทางสำหรับหน้า Login
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
