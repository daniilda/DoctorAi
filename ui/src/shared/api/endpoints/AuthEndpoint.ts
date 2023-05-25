import api from "@/utils/api";

interface UserResult {
  id: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  picUrl: string;
}

export const UserEndpoint = new (class {
  async login(username: string, password: string) {
    return { id: result } as UserResult;
  }
})();
