import { useAuthContext } from "../contexts/AuthContext";
import { UserIcon } from "./FontAwesome";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative dropdown  dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle avatar">
        <div className="w-10 rounded-full flex items-center justify-center">
          <UserIcon className="w-full h-full" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow bg-white"
      >
        <li className="z-100">
          <a onClick={handleLogout}>Logout</a>
        </li>
        <li>
          <a href="/userprofile" className="justify-between">
            Profile
            <span className="badge badge-neutral">New</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
