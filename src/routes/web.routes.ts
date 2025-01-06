import { Express } from "express";
import homeRoutes from "./home.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

export const initWebRoutes = (app: Express) => {
    app.use("/api/v1/home", homeRoutes);
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/users", userRoutes);
};
