import { Express } from "express";
import homeRoutes from "./home.routes";

export const initWebRoutes = (app: Express) => {
    app.use("/api/home", homeRoutes);
};
