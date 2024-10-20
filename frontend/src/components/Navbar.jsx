import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import UserProfile from "./UserProfile";
import { useAuthContext } from "../contexts/AuthContext";
import { StoreIcon } from "./FontAwesome";

const Navbar = () => {
  // ดึงข้อมูล user จาก AuthContext
  const { user } = useAuthContext();

  //new!
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
  const renderMenuItem = (menuItem) => {
    switch (menuItem.name) {
      case "HOME":
        return (
          <a
            href={menuItem.link}
            className="flex items-center space-x-1 text-black"
          >
            <span>Home</span>
          </a>
        );
      case "STORE":
        return (
          <a
            href={menuItem.link}
            className="flex items-center space-x-1 text-black"
          >
            <span>STORE</span>
          </a>
        );
      case "ADD":
        return (
          <a
            href={menuItem.link}
            className="flex items-center space-x-1 text-black"
          >
            <span>Add</span>
          </a>
        );

      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="navbar px-20 p-6 bg-[#ffffff] drop-shadow-lg rounded-b-lg">
        {/* Logo Section */}
        <div className="navbar-start">
          <a href="/">
            <StoreIcon style={{ fontSize: "32px" }} />{" "}
            {/* ปรับขนาดไอคอนเป็น 32px */}
          </a>
        </div>

        {/* Menu Section */}
        <div className="navbar-center flex items-center justify-start flex-1">
          {user &&
            menus[user.roles[0]].map((menuItem) => (
              <div key={menuItem.name} className="mr-10">
                {renderMenuItem(menuItem)}
              </div>
            ))}
        </div>

        {/* User Section */}
        <div className="navbar-end flex items-center space-x-4 text-black">
          {user && (
            <div>
              Welcome,{" "}
              <span className="font-medium border-zinc-800 ">
                {user.username}
                <div className="inline-flex space-x-2 ml-2 border-zinc-800">
                  {user.roles.map((role, index) => (
                    <span
                      key={index}
                      className="badge badge-neutral text-xs py-1 px-2 rounded text-white"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </span>
            </div>
          )}

          {user ? (
            <div className="text-black">
              <UserProfile />
            </div>
          ) : (
            <div className="space-x-2">
              <LoginButton />
              <RegisterButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
