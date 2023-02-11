export interface LoginData {
  username: string;
  password: string;
}
export interface AuthData {
  token: string;
  email: string;
  user_id: string;
}
export interface CustomerAuthData extends AuthData {}

export interface StaffAuthData extends AuthData {}
