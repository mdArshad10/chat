import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser({ extended: true }));
app.use(cors({
    origin:[process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE",],
    credentials: true,
}));

export { app };
