import axios, { AxiosResponse } from "axios";
import { getStoredAuthToken, removeStoredAuthToken } from "./authToken";
import history from "./browserHistory";

axios.defaults.baseURL = "http://188.72.108.108";
// axios.defaults.headers.common["Authorization"] = getStoredAuthToken()
//   ? `Bearer ${getStoredAuthToken()}`
//   : undefined;

const get = (path: string, config?: any) =>
  new Promise((resolve, reject) => {
    axios
      .get(path, {
        headers: {
          Authorization: getStoredAuthToken()
            ? `Bearer ${getStoredAuthToken()}`
            : undefined,
        },
        ...config,
      })
      .then((response: AxiosResponse) => resolve(response.data))
      .catch((error) => {
        if (error.response) {
          removeStoredAuthToken();
          history.push("/login");
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });

const post = (path: string, variables?: any, config?: any) =>
  new Promise((resolve, reject) => {
    axios
      .post(path, variables, {
        headers: {
          Authorization: getStoredAuthToken()
            ? `Bearer ${getStoredAuthToken()}`
            : undefined,
        },
        ...config,
      })
      .then((response: AxiosResponse) => resolve(response.data))
      .catch((error) => {
        if (error.response) {
          removeStoredAuthToken();
          history.push("/login");
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });

export default {
  get,
  post,
};
