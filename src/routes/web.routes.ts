import { Express } from "express";
import homeRoutes from "./home.routes";
import userRoutes from "./users.routes";

export const initWebRoutes = (app: Express) => {
    app.use("/api/v1/home", homeRoutes);
    app.use("/api/v1/users", userRoutes);
};
