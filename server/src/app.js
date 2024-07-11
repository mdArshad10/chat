import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/Error.middleware.js";

import authRouter from "./routes/auth.route.js";
import contactRouter from "./routes/contact.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser({ extended: true }));
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1", authRouter);
app.use("/api/v1", contactRouter);

app.use(errorMiddleware);

app.use("*", (req, res, next) => {
  res.status(404).json({
    success: true,
    message: "page not found",
  });
});

export { app };
