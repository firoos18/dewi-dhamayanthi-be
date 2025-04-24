import { Request } from "express";
import { IAddEbook, IGetAllEbooks } from "../interfaces/ebook.interface";
import {
  IBaseResponse,
  IPaginatedResponse,
} from "../interfaces/global.interface";
import db from "../prisma/client.prisma";
import supabase from "../config/supabase.config";
import { NotFoundError } from "../utils/HttpError";

export const SAddEbook = async (req: Request): Promise<IBaseResponse> => {
  try {
    const ebookData: IAddEbook = req.body;

    const newEbook = await db.mst_ebook.create({
      data: {
        title: ebookData.title,
        author: ebookData.author,
        url: ebookData.url,
        status: ebookData.status,
        description: ebookData.description,
        cover: null,
        created_at: new Date(),
        categoryId: ebookData.categoryId,
      },
    });

    if (req.file) {
      const fileExt = req.file.mimetype.split("/")[1];
      const fileName = `books/${newEbook.id}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("ebook-covers")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (error) throw new Error("Failed to upload image: " + error.message);

      const { data: publicUrl } = supabase.storage
        .from("ebook-covers")
        .getPublicUrl(fileName);

      await db.mst_ebook.update({
        where: { id: newEbook.id },
        data: {
          cover: publicUrl.publicUrl,
        },
      });
    }

    return {
      status: true,
      message: "Ebook Added!",
    };
  } catch (error: any) {
    throw Error(error);
  }
};

export const SGetAllBooks = async (
  page: number = 1,
  pageSize: number = 8,
  query: string = ""
): Promise<IPaginatedResponse<IGetAllEbooks[]>> => {
  try {
    const skip = (page - 1) * pageSize;

    const [bookData, totalRecords] = await Promise.all([
      db.mst_ebook.findMany({
        where:
          query === ""
            ? {
                deleted_at: null,
              }
            : {
                deleted_at: null,
                OR: [{ title: { contains: query, mode: "insensitive" } }],
              },
        include: {
          tags: true,
          category: true,
        },
        skip,
        take: pageSize,
      }),
      db.mst_ebook.count({
        where:
          query === ""
            ? { deleted_at: null }
            : {
                deleted_at: null,
                OR: [{ title: { contains: query, mode: "insensitive" } }],
              },
      }),
    ]);

    const totalPage = Math.ceil(totalRecords / pageSize);

    const data: IPaginatedResponse<IGetAllEbooks[]> = {
      status: true,
      message: "Success get all ebooks!",
      data: bookData.map(
        (ebook): IGetAllEbooks => ({
          id: ebook.id,
          title: ebook.title,
          description: ebook.description,
          cover: ebook.cover,
          status: ebook.status,
          url: ebook.url,
          published_at: ebook.published_at ? String(ebook.published_at) : null,
          author: ebook.author,
          category: ebook.category.name,
        })
      ),
      pagination: {
        total_records: totalRecords,
        current_page: page,
        total_page: totalPage,
        next_page: page < totalPage ? page + 1 : null,
        prev_page: page > 1 ? page - 1 : null,
      },
    };

    return data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const SGetEbookById = async (
  id: string
): Promise<IBaseResponse<IGetAllEbooks>> => {
  try {
    const ebookData = await db.mst_ebook.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        tags: true,
      },
    });

    if (!ebookData || ebookData.deleted_at) {
      throw new NotFoundError("Book not found!");
    }

    const data: IBaseResponse<IGetAllEbooks> = {
      message: "Success get ebook by id!",
      status: true,
      data: {
        id: ebookData.id,
        title: ebookData.title,
        description: ebookData.description,
        cover: ebookData.cover,
        url: ebookData.url,
        status: ebookData.status,
        author: ebookData.author,
        category: ebookData.category.name,
        published_at: String(ebookData.published_at),
      },
    };

    return data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const SUpdateEbook = async (id: string) => {
  try {
  } catch (error: any) {
    throw Error(error);
  }
};
