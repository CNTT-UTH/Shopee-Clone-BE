/* eslint-disable prettier/prettier */
import express from "express";
import UserController from "~/controllers/users.controller";
import { asyncHandler } from "~/utils/asyncHandler";
import { loginValidator, registerValidator } from "~/middlewares/users.middleware";

const router = express.Router();

router
    .route("/")
    .get(UserController.greetings);

router
    .route("/login")
    .post(loginValidator, asyncHandler(UserController.login));

router
    .route("/register")
    .post(registerValidator, asyncHandler(UserController.register));

export default router;
