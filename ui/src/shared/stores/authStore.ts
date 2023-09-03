import { AuthEndpoint, UserResult } from "@/api/endpoints/AuthEndpoint";
import { removeStoredAuthToken } from "@/utils/authToken";
import { makeAutoObservable } from "mobx";

type AuthState = "loading" | "anonymous" | "authorized";

const AuthStore = new (class {
  public user: UserResult | null = null;
  public authState: AuthState = "loading";

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  public async login(username: string, password: string) {
    if (!username || !password) return false;
    try {
      const user = await AuthEndpoint.login(username, password);
      if (user) {
        this.user = user;
        this.authState = "authorized";
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public logout() {
    this.user = null;
    this.authState = "anonymous";
    removeStoredAuthToken();
  }

  public async checkAuth() {
    try {
      const user = await AuthEndpoint.getUser();
      this.setUserAndAuthState(user);
    } catch {
      this.setUserAndAuthState(null);
    }
  }

  private setUserAndAuthState(user: UserResult | null) {
    if (user) {
      this.user = user;
      this.authState = "authorized";
    } else {
      this.user = null;
      this.authState = "anonymous";
    }
  }
})();

export default AuthStore;
