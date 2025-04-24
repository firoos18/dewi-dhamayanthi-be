import { NextFunction, Request, Response } from "express";
import {
  SAddEbookCategory,
  SGetEbookCategory,
} from "../services/ebook.category.service";

export const CAddEbookCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SAddEbookCategory(req);

    res.status(201).json(resData);
  } catch (error) {
    next(error);
  }
};

export const CGetAllEbookCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SGetEbookCategory();

    res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
};
