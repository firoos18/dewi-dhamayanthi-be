import {
  IAddEbookCategory,
  IGetAllEbookCategories,
} from "../interfaces/ebook.category";
import { IBaseResponse } from "../interfaces/global.interface";
import db from "../prisma/client.prisma";
import { Request } from "express";

export const SAddEbookCategory = async (
  req: Request
): Promise<IBaseResponse> => {
  try {
    const ebookCategoryData: IAddEbookCategory = req.body;

    await db.mst_ebook_category.create({
      data: ebookCategoryData,
    });

    return {
      status: true,
      message: "Ebook Category Added!",
    };
  } catch (error: any) {
    throw Error(error);
  }
};

export const SGetEbookCategory = async (): Promise<
  IBaseResponse<IGetAllEbookCategories[]>
> => {
  try {
    const ebookCategories = await db.mst_ebook_category.findMany({});

    return {
      status: true,
      message: "Success",
      data: ebookCategories,
    };
  } catch (error: any) {
    throw Error(error);
  }
};
