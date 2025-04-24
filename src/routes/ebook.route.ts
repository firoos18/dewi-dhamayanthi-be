import { Router } from "express";
import {
  CAddEbook,
  CGetAllBooks,
  CGetEbookById,
} from "../controller/ebook.controller";
import { MUploadCoverImage } from "../middleware/ebook.middleware";
import { errorHandler } from "../middleware/error.middleware";

const router = Router();

router.get("/", CGetAllBooks);

router.get("/:id", CGetEbookById);

router.post("/", MUploadCoverImage, CAddEbook);

export default router;
