import { makeAutoObservable } from "mobx";

type AppTheme = "dark" | "light";

export const ThemeStore = new (class {
  public theme: AppTheme = "dark";

  constructor() {
    makeAutoObservable(this);
  }

  public setTheme = (newTheme: AppTheme) => {
    this.theme = newTheme;
  };
})();
