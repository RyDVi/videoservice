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

export interface SignupData {
  username: string;
  email: string;
  password: string;
  password_repeat: string;
}

export interface SignupResultData {
  username: string;
  email: string;
}

export interface NewPasswordData extends AcceptData {
  password: string;
  password_repeat: string;
}

export interface RestoreDataForSendEmail {
  email_or_username: string;
}

export interface AcceptData {
  token: string;
  user_id: string;
}
