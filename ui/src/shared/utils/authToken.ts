import AuthStore from "@/stores/authStore";
import { toJS } from "mobx";

export const getStoredAuthToken = () => localStorage.getItem("authToken");

export const setStoredAuthToken = (token: string) =>
  localStorage.setItem("authToken", token);

export const removeStoredAuthToken = () => {
  localStorage.removeItem("authToken");
  if (AuthStore.authState === "authorized") {
    AuthStore.authState = "anonymous";
  }
  console.log(toJS(AuthStore.authState));
};
