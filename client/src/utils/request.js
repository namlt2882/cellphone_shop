import Axios from "axios";
import { HOST_NAME } from "../constants";

export const Request = () => {
  return Axios.create({
    baseURL: HOST_NAME
  });
};

const getToken = () => {
  let token = localStorage.getItem("token");
  return "Bearer " + token;
};

const getAuthConfig = () => {
  let config = {
    headers: {
      Authorization: getToken()
    }
  };
  return config;
};

export const AuthRequest = {
  post(URL, data) {
    let config = getAuthConfig();
    return Request().post(URL, data, config);
  },
  get(URL) {
    let config = getAuthConfig();
    return Request().get(URL, config);
  },
  put(URL, data) {
    let config = getAuthConfig();
    return Request().put(URL, data, config);
  },
  delete(URL) {
    let config = getAuthConfig();
    return Request().delete(URL, config);
  }
};
