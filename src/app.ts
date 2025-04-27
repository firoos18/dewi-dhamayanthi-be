import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import ebookRouter from "./routes/ebook.route";
import authRouter from "./routes/auth.route";
import ebookCategoryRouter from "./routes/ebook.category.route";

const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://dewi-dhamayanthi.vercel.app",
  "https://dev-dewi-dhamayanthi.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());

// Route
app.use("/ebook", ebookRouter);
app.use("/auth", authRouter);
app.use("/ebook-category", ebookCategoryRouter);

app.use(errorHandler);

app.listen(4000);

export default app;
