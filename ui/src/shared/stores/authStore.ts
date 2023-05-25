import { AuthEndpoint, UserResult } from "@/api/endpoints/AuthEndpoint";
import { removeStoredAuthToken } from "@/utils/authToken";
import { makeAutoObservable } from "mobx";

const AuthStore = new (class {
  public user: UserResult | null = null;
  public isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  public async login(username: string, password: string) {
    const user = await AuthEndpoint.login(username, password);
    if (user) {
      this.user = user;
      this.isAuthenticated = true;
    }
  }

  public logout() {
    this.user = null;
    this.isAuthenticated = false;
    removeStoredAuthToken();
  }

  public async checkAuth() {
    const user = await AuthEndpoint.getUser();
    if (user) {
      this.user = user;
      this.isAuthenticated = true;
    } else {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
})();

export default AuthStore;
