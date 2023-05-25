import { makeAutoObservable } from "mobx";

const AuthStore = new (class {
  public user = "";
  public isAuthenticated = true;

  constructor() {
    makeAutoObservable(this);
  }

  public login(username: string, password: string) {}
})();

export default AuthStore;
