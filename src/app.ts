import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import { envConfig } from "./constants/env";
import { initWebRoutes } from "./routes/web.routes";
import AppDataSource from "./config/db";
import { errorHandler } from "./middlewares/errorHandler.middlewares";

const app = express();

app.use(
    cors({
        origin: envConfig.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
);

// Config View Engine
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.json());

initWebRoutes(app);

app.use(errorHandler);

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!");
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err);
//     });

export default app;
