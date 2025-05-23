import { Router } from "express";
import {
  CAddEbookCategory,
  CGetAllEbookCategories,
} from "../controller/ebook.category.controller";

const router = Router();

router.get("/", CGetAllEbookCategories);

router.post("/", CAddEbookCategory);

export default router;
