import { Express } from "express";
import homeRoutes from "./home.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import shopRoutes from "./shop.routes";

export const initWebRoutes = (app: Express) => {
    app.use("/api/v1/home", homeRoutes);
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/shops", shopRoutes);

};
