import { BaseEndpoint } from '../base/endpoints';
import { CustomerAuthData, LoginData, StaffAuthData } from './types';
import { useRequest, ValidationErrors } from '../base/request';

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

class AuthEndpoint extends BaseEndpoint {
  initialLoginData = (): LoginData => ({ username: '', password: '' });
  login = (data: LoginData) => ({
    url: `${this.uri}login/`,
    method: 'POST',
    data,
  });
  logout = () => ({
    url: `${this.uri}logout/`,
    method: 'GET',
  });
}

const auth = new AuthEndpoint('/auth/');
const authStaff = new AuthEndpoint('/auth/staff/');
export default { auth, authStaff };
