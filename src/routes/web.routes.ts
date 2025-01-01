import { Express } from "express";
import homeRoutes from "./home.routes";
import authRoutes from "./auth.routes";

export const initWebRoutes = (app: Express) => {
    app.use("/api/v1/home", homeRoutes);
    app.use("/api/v1/auth", authRoutes);
};
