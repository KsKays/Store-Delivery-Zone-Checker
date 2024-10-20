import api from "./api";
const API_URL = import.meta.env.VITE_AUTH_API;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const register = async (username, email, password) => {
  return await api.post(API_BASE_URL + API_URL + "/store/signup", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  console.log(API_URL + "/store/signin");
  const response = await api.post(API_BASE_URL + API_URL + "/store/signin", {
    username,
    password,
  });

  if (response.data.accessToken) {
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.accessToken)
    );
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response;
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
