import { NextFunction, Request, Response } from "express";
import { SRegisterUser, SUserLogin } from "../services/auth.service";
import { CreateRefreshToken, CreateToken } from "../helper/jwt.helper";
import jwt from "jsonwebtoken";

export const CUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SUserLogin(req.body);

    res.cookie("accessToken", resData.data?.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", resData.data?.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(resData);
  } catch (error: any) {
    next(error);
  }
};

export const CUserRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SRegisterUser(req.body);

    res.status(201).json(resData);
  } catch (error: any) {
    next(error);
  }
};

export const CGetUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = {
      status: true,
      message: "Success get user data!",
      data: {
        id: req?.user?.id,
        name: req.user?.fullname,
        email: req.user?.email,
      },
    };

    res.status(200).json(resData);
  } catch (error: any) {
    next(error);
  }
};

export const CRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as unknown as { id: string };

    if (!decoded || !decoded.id) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = CreateToken({ id: decoded.id });
    const newRefreshToken = CreateRefreshToken({ id: decoded.id });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: true,
      message: "Access token refreshed",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error: any) {
    next(error);
  }
};
