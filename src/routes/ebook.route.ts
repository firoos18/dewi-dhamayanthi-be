import { Router } from "express";
import {
  CAddEbook,
  CGetAllBooks,
  CGetEbookById,
  CUpdateEbook,
} from "../controller/ebook.controller";
import { MUploadCoverImage } from "../middleware/ebook.middleware";

const router = Router();

router.get("/", CGetAllBooks);

router.get("/:id", CGetEbookById);

router.post("/", MUploadCoverImage, CAddEbook);

router.put("/:id", MUploadCoverImage, CUpdateEbook);

export default router;
