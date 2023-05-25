import api from "@/utils/api";
import { setStoredAuthToken } from "@/utils/authToken";

export interface UserResult {
  id: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  picUrl: string;
}

export const AuthEndpoint = new (class {
  async login(username: string, password: string) {
    const result = await api.post("/api/v1/sauth/login", {
      username,
      password,
    });
    if (!result) return null;
    console.log(result);
    setStoredAuthToken(result as string);
    return await this.getUser();
  }

  async getUser() {
    const result = await api.get("/api/v1/sauth/user");
    if (!result) return null;
    return result as UserResult;
  }
})();
