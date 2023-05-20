import axios, { AxiosResponse } from "axios";
import { getStoredAuthToken, removeStoredAuthToken } from "./authToken";
import history from "./browserHistory";

axios.defaults.baseURL = "https://api.localhost:3001/api/v1";
axios.defaults.headers.common["Authorization"] = getStoredAuthToken()
  ? `Bearer ${getStoredAuthToken()}`
  : undefined;

const api = (
  method: "get" | "post",
  path: string,
  variables?: Record<string, unknown>
) =>
  new Promise((resolve, reject) => {
    axios[method](path, variables)
      .then((response: AxiosResponse) => resolve(response.data))
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            removeStoredAuthToken();
            history.push("/login");
          }
          reject(error.response.data);
        } else {
          reject(error);
        }
      });
  });

export default api;
