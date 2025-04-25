import {
  IUserLoginRequestBody,
  IUserLoginResponseBody,
  IUserRegisterRequestBody,
} from "../interfaces/auth.interface";
import { IBaseResponse } from "../interfaces/global.interface";
import bcrypt from "bcryptjs";
import db from "../prisma/client.prisma";
import { CreateToken } from "../helper/jwt.helper";
import { ConflictError, UnauthorizedError } from "../utils/HttpError";

export const SUserLogin = async (
  body: IUserLoginRequestBody
): Promise<IBaseResponse<IUserLoginResponseBody>> => {
  try {
    const { email, password } = body;

    const userData = await db.mst_user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) throw new UnauthorizedError("Email or password invalid!");

    const isPassSame = await bcrypt.compare(password, userData.password);

    if (!isPassSame) throw new UnauthorizedError("Email or password invalid!");

    const accessToken = CreateToken({
      id: userData.id,
    });

    return {
      status: true,
      message: "Login Successful",
      data: {
        token: accessToken,
      },
    };
  } catch (error: any) {
    throw error;
  }
};

export const SRegisterUser = async (
  body: IUserRegisterRequestBody
): Promise<IBaseResponse> => {
  try {
    const { email, password, confirmPassword, fullname } = body;

    const isEmailExist = await db.mst_user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) throw new ConflictError("Email already registered!");

    if (password !== confirmPassword)
      throw new UnauthorizedError("Password don't match");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.mst_user.create({
      data: {
        email,
        password: hashedPassword,
        fullname,
      },
    });

    if (!newUser) throw new UnauthorizedError("User Registration error!");

    return {
      status: true,
      message: "User created",
    };
  } catch (error: any) {
    throw error;
  }
};
