import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {" "}
        {/* ใช้ Flexbox กับ min-h-screen */}
        <Navbar />
        <div className="flex-grow z-10">
          {" "}
          {/* ทำให้เนื้อหาขยายเต็มพื้นที่ */}
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Layout;
