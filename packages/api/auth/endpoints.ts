import { BaseEndpoint } from "../base/endpoints";
import { LoginData } from "./types";

class AuthEndpoint extends BaseEndpoint {
  initialLoginData = (): LoginData => ({ username: "", password: "" });
  login = (data: LoginData) => ({
    url: `${this.uri}login/`,
    method: "POST",
    data,
  });
  logout = () => ({
    url: `${this.uri}logout/`,
    method: "GET",
  });
}

export const auth = new AuthEndpoint("/auth/");
export const authStaff = new AuthEndpoint("/auth/staff/");
