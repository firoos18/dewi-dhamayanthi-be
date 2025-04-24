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
  token: string;
}

export interface IUserRegisterRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  fullname: string;
}
