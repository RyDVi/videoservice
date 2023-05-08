import {
  auth,
  authStaff,
  CustomerAuthData,
  LoginData,
  StaffAuthData,
} from "@modules/api";

import { useAxiosRequest, ValidationErrors } from "../axios";

export function useLogin() {
  const {
    request: login,
    error: errorOflogin,
    data: loginData,
    setData: setLoginData,
    loading,
  } = useAxiosRequest<LoginData, CustomerAuthData, ValidationErrors<LoginData>>(
    {
      initial: auth.initialLoginData(),
      config: (data) => auth.login(data),
    }
  );
  return { loginData, errorOflogin, login, setLoginData, loading };
}

export function useStaffLogin() {
  const {
    request: login,
    error: errorOflogin,
    data: loginData,
    setData: setLoginData,
  } = useAxiosRequest<LoginData, StaffAuthData, ValidationErrors<LoginData>>({
    initial: auth.initialLoginData(),
    config: (data) => authStaff.login(data),
  });
  return { loginData, errorOflogin, login, setLoginData };
}

export function useStaffLogout() {
  const { request: logout } = useAxiosRequest<
    LoginData,
    StaffAuthData,
    ValidationErrors<LoginData>
  >({
    initial: auth.initialLoginData(),
    config: authStaff.logout,
  });
  return { logout };
}
