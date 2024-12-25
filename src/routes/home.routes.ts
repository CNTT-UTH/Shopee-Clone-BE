import express from "express";
import HomeController from "~/controllers/home.controllers";
const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
    .route("/")
    .get(HomeController.greetings);

export default router;
