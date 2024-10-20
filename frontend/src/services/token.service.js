const getLocalAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user)); //เปลี่ยน Json ให้เป็น Text
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user")); //เปลี่ยน Text ให้เป็น Json และส่งออกไป
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalAccessToken,
  setUser,
  getUser,
  removeUser,
};

export default TokenService;
