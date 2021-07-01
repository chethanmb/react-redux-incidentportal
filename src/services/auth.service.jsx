import axios from "axios";

const API_URL = "http://localhost/Users/";

const register = (
  username,
  password,
  empId,
  fname,
  lname,
  phone,
  custEmail,
  locationId,
  customerId
) => {
  return axios.post(API_URL + "register", {
    username,
    password,
    empId,
    fname,
    lname,
    phone,
    custEmail,
    locationId,
    customerId,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "authenticate", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
