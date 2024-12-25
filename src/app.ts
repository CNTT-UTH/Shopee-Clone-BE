import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";

import { envConfig } from "./constants/env";
import { initWebRoutes } from "./routes/web.routes";
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

initWebRoutes(app);

export default app;
