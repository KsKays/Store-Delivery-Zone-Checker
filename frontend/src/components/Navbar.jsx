import { useState } from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import UserProfile from "./UserProfile";
import { useAuthContext } from "../contexts/AuthContext";
import { StoreIcon } from "./FontAwesome";

const Navbar = () => {
  const { user } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menus = {
    ROLES_ADMIN: [
      { name: "HOME", link: "/" },
      { name: "ADD", link: "/addstore" },
      { name: "STORE", link: "/storetable" },
    ],
    ROLES_MODERATOR: [
      { name: "HOME", link: "/" },
      { name: "ADD", link: "/addstore" },
      { name: "STORE", link: "/storetable" },
    ],
    ROLES_USER: [{ name: "HOME", link: "/" }],
  };

  const renderMenuItem = (menuItem) => (
    <a
      href={menuItem.link}
      className="block py-2 px-4 text-black hover:bg-gray-100 rounded-md"
    >
      {menuItem.name}
    </a>
  );

  return (
    <nav className="bg-slate-50 drop-shadow-lg rounded-b-lg relative">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center flex-grow">
          <a href="/" className="text-2xl mr-8">
            <StoreIcon style={{ fontSize: "32px" }} />
          </a>

          {/* Menu Section for Desktop */}
          <div className="hidden md:flex space-x-8 justify-start">
            {user &&
              menus[user.roles[0]].map((menuItem) => (
                <div key={menuItem.name}>{renderMenuItem(menuItem)}</div>
              ))}
          </div>
        </div>

        {/* User Section and Hamburger Icon for Mobile */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-black font-medium">
                Welcome, {user.username}
              </span>
              <div className="inline-flex space-x-2 ml-2">
                {user.roles.map((role, index) => (
                  <span
                    key={index}
                    className="badge badge-neutral text-xs py-1 px-2 rounded text-white bg-gray-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <UserProfile />
            </div>
          ) : (
            <div className="flex space-x-2">
              <LoginButton />
              <RegisterButton />
            </div>
          )}

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            {user &&
              menus[user.roles[0]].map((menuItem) => (
                <div key={menuItem.name} className="mb-2">
                  {renderMenuItem(menuItem)}
                </div>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
