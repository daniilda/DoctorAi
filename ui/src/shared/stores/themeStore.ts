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
    }
    this.updateTheme();
  }

  public setTheme = (newTheme: AppTheme) => {
    this.theme = newTheme;
    this.updateTheme();
  };

  private updateTheme = () => {
    document.documentElement.setAttribute("data-color-scheme", this.theme);
    document.body.style.backgroundColor =
      this.theme === "dark" ? "#282828" : "#F6F5FC";
    setStoredTheme(this.theme);
  };
})();
