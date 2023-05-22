import { makeAutoObservable } from "mobx";

const AuthStore = new (class {
  public user = "";
  public isAuthenticated = true;

  constructor() {
    makeAutoObservable(this);
  }
})();

export default AuthStore;
