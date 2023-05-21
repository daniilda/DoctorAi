import { makeAutoObservable } from "mobx";

const AuthStore = new (class {
  public user = "";
  public isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }
})();

export default AuthStore;
