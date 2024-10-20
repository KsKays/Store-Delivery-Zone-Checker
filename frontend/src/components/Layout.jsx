import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className="z-10">
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default Layout;
