import api from "@/utils/api";
import { getStoredAuthToken, setStoredAuthToken } from "@/utils/authToken";
import { MOCK_USER } from "./mocks";

const IS_MOCK = import.meta.env.VITE_IS_MOCK === "true";

export interface UserResult {
  id: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  picUrl: string;
}

export namespace AuthEndpoint {
  export const login = async (username: string, password: string) => {
    if (IS_MOCK) {
      setStoredAuthToken("mock");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (username !== "housemd" || password !== "housemd") return null;

      return MOCK_USER;
    }

    try {
      const result = await api.post("/api/v1/sauth/login", {
        username,
        password,
      });
      if (!result) return null;

      setStoredAuthToken(result as string);
      return await getUser();
    } catch {
      return null;
    }
  };

  export const getUser = async () => {
    if (IS_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const token = getStoredAuthToken();
      if (token !== "mock") return null;

      return MOCK_USER;
    }

    const result = (await api.get("/api/v1/sauth/user")) as UserResult;
    return result ?? null;
  };
}
