import { AuthEndpoint, UserResult } from "@/api/endpoints/AuthEndpoint";
import { removeStoredAuthToken } from "@/utils/authToken";
import { makeAutoObservable } from "mobx";

const AuthStore = new (class {
  public user: UserResult | null = null;
  public authState: "loading" | "anonymous" | "authorized" = "loading";

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  public async login(username: string, password: string) {
    const user = await AuthEndpoint.login(username, password);
    if (user) {
      this.user = user;
      this.authState = "authorized";
    } else {
      this.authState = "anonymous";
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
      if (user) {
        this.user = user;
        this.authState = "authorized";
      }
    } catch {
      this.user = null;
      this.authState = "anonymous";
    }
  }
})();

export default AuthStore;
