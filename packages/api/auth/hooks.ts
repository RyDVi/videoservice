import { CustomerAuthData, LoginData, StaffAuthData } from "./types";

import { useRequest, ValidationErrors } from "../base/request";
import { auth, authStaff } from "./endpoints";

export function useLogin() {
  const {
    request: login,
    error: errorOflogin,
    data: loginData,
    setData: setLoginData,
    loading,
  } = useRequest<LoginData, CustomerAuthData, ValidationErrors<LoginData>>({
    initial: auth.initialLoginData(),
    config: (data) => auth.login(data),
  });
  return { loginData, errorOflogin, login, setLoginData, loading };
}

export function useStaffLogin() {
  const {
    request: login,
    error: errorOflogin,
    data: loginData,
    setData: setLoginData,
  } = useRequest<LoginData, StaffAuthData, ValidationErrors<LoginData>>({
    initial: auth.initialLoginData(),
    config: (data) => authStaff.login(data),
  });
  return { loginData, errorOflogin, login, setLoginData };
}

export function useStaffLogout() {
  const { request: logout } = useRequest<
    LoginData,
    StaffAuthData,
    ValidationErrors<LoginData>
  >({
    initial: auth.initialLoginData(),
    config: authStaff.logout,
  });
  return { logout };
}
