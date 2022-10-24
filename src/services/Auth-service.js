import axiosInstance from "./Axios";

const register = async (email, name, mobile, password) => {
  return axiosInstance.post("user/register.php", {
    email,
    name,
    mobile,
    password,
  })
    .then((response) => {
      return response.data;
    });
};

const login = async (userName, password) => {
  //alert(userName);
  return axiosInstance
    .post("user/login.php", {
      userName,
      password,
    })
    .then((response) => {
      //console.log(JSON.stringify(response));
      if (response.data) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.userData));
      }
      return response.data;
    });
};


const logout = () => {
  localStorage.clear();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}
export default AuthService;