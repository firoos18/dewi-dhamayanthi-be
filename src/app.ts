import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware";
import ebookRouter from "./routes/ebook.route";
import authRouter from "./routes/auth.route";
import ebookCategoryRouter from "./routes/ebook.category.route";

const app = express();
app.use(cors());

app.use(express.json());

// Route
app.use("/ebook", ebookRouter);
app.use("/auth", authRouter);
app.use("/ebook-category", ebookCategoryRouter);

app.use(errorHandler);

app.listen(4000);

export default app;
