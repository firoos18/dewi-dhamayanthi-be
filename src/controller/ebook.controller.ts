import { NextFunction, Request, Response } from "express";
import {
  SAddEbook,
  SGetAllBooks,
  SGetEbookById,
  SUpdateEbook,
} from "../services/ebook.service";

export const CAddEbook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resData = await SAddEbook(req);

    res.status(201).json(resData);
  } catch (error) {
    next(error);
  }
};

export const CGetAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = +(<number>(<unknown>req.query.page));
    const pageSize = +(<number>(<unknown>req.query.pageSize));
    const query = req.query.query?.toString();
    const category = req.query.category
      ? Array.isArray(req.query.category)
        ? req.query.category.filter((item) => typeof item === "string")
        : [req.query.category.toString()]
      : [];
    const status = req.query.status?.toString();

    const resData = await SGetAllBooks(page, pageSize, query, category, status);

    res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
};

export const CGetEbookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id.toString();

    const resData = await SGetEbookById(id);

    res.status(200).json(resData);
  } catch (error: any) {
    next(error);
  }
};

export const CUpdateEbook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id.toString();

    const resData = await SUpdateEbook(id, req);

    res.status(200).json(resData);
  } catch (error: any) {
    next(error);
  }
};
