import { BaseEndpoint } from "../base";
import {
  LoginData,
  NewPasswordData,
  RestoreDataForSendEmail,
  AcceptData,
  SignupData,
} from "./types";

class AuthEndpoint extends BaseEndpoint {
  // Методы входа
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

  // Методы регистрации
  initialSignupData = (data?: Partial<SignupData>): SignupData => ({
    username: "",
    password: "",
    email: "",
    password_repeat: "",
    ...data,
  });
  signup = (data: SignupData) => ({
    url: `${this.uri}signup/`,
    method: "POST",
    data,
  });

  // Методы подтверждения регистрации
  initialSignupAcceptData = (data?: Partial<AcceptData>): AcceptData => ({
    token: "",
    user_id: "",
    ...data,
  });
  signupAccept = (data: AcceptData) => ({
    url: `${this.uri}signup/accept_email/${data.user_id}/${data.token}/`,
    method: "GET",
  });

  // Методы восстановления пароля
  initialRestoreDataForSendEmail = (
    data?: Partial<RestoreDataForSendEmail>
  ): RestoreDataForSendEmail => ({
    email_or_username: "",
    ...data,
  });
  sendEmailForRestore = (data: RestoreDataForSendEmail) => ({
    url: `${this.uri}restore_password/send_email_for_restore_password/`,
    method: "POST",
    data,
  });
  // Методы установки нового пароля
  initialNewPasswordData = (
    data?: Partial<NewPasswordData>
  ): NewPasswordData => ({
    password: "",
    password_repeat: "",
    token: "",
    user_id: "",
    ...data,
  });
  setNewPassword = (data: NewPasswordData) => ({
    url: `${this.uri}restore_password/set_new_password/${data.user_id}/${data.token}/`,
    method: "POST",
    data,
  });
}

export const auth = new AuthEndpoint("/auth/");
export const authStaff = new AuthEndpoint("/auth/staff/");
