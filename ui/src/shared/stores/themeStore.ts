import { makeAutoObservable } from "mobx";

type AppTheme = "dark" | "light";

export const getStoredTheme = () => localStorage.getItem("themeColor");

export const setStoredTheme = (theme: string) =>
  localStorage.setItem("themeColor", theme);

export const ThemeStore = new (class {
  public theme: AppTheme = "light";

  constructor() {
    makeAutoObservable(this);
    if (getStoredTheme()) {
      this.theme = getStoredTheme() as AppTheme;
    } else {
      setStoredTheme(this.theme);
    }
    document.documentElement.setAttribute("data-color-scheme", this.theme);
  }

  public setTheme = (newTheme: AppTheme) => {
    this.theme = newTheme;
    setStoredTheme(newTheme);
    document.documentElement.setAttribute("data-color-scheme", this.theme);
  };
})();
