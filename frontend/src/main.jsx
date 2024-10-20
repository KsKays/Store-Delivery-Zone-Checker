import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx"; // นำเข้า router ที่คุณสร้าง

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
