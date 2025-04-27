export interface IJWTUserPayload {
  id: string;
  email: string;
  fullname: string | null;
}

export interface IUserLoginRequestBody {
  email: string;
  password: string;
}

export interface IUserLoginResponseBody {
  accessToken: string;
  refreshToken: string;
}

export interface IUserRegisterRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  fullname: string;
}
