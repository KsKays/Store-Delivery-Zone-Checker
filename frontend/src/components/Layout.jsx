import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          {" "}
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Layout;
