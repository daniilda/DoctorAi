import { getStoredAuthToken, removeStoredAuthToken } from "./authToken";
import history from "./browserHistory";

const url = import.meta.env.VITE_API_URL;

export const api = {
  async get(path: string) {
    const response = await fetch(`${url}${path}`, {
      headers: {
        Authorization: `Bearer ${getStoredAuthToken()}`,
      },
    });
    return await response.json();
  },
  async post(path: string, body: any) {
    const response = await fetch(`${url}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getStoredAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  },
  async form(path: string, formData: FormData) {
    const response = await fetch(`${url}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getStoredAuthToken()}`,
      },
      body: formData,
    });
    return await response.json();
  },
};
