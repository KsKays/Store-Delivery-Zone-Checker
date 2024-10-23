import { useAuthContext } from "../contexts/AuthContext";

const UserProfilePage = () => {
  const { user } = useAuthContext();

  const maskingString = (str, start, end) => {
    if (
      !str ||
      start < 0 ||
      start >= str.length ||
      end < 0 ||
      end > str.length ||
      start >= end
    ) {
      return str;
    }

    const maskedStr =
      str.substring(0, start) + "*".repeat(20) + str.substring(end);
    return maskedStr;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="card card-side bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl">
        <figure className="flex-shrink-0 w-1/2">
          <img
            src="https://images.unsplash.com/photo-1492447166138-50c3889fccb1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </figure>
        <div className="card-body p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              User Profile
            </h2>
            <p className="text-lg mb-2 text-gray-700">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-lg mb-2 text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-lg mb-2 text-gray-700">
              <span className="font-semibold">Role:</span>{" "}
              {user?.roles.join(", ")}
            </p>
            <p className="text-lg mb-2 text-gray-700">
              <span className="font-semibold">Token:</span>{" "}
              {maskingString(user.accessToken, 3, user.accessToken.length - 3)}
            </p>
          </div>
          <div className="card-actions flex justify-end mt-4">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
