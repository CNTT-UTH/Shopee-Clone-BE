/* eslint-disable prettier/prettier */
import express from "express";
import AuthController from "~/controllers/auth.controller";
import { asyncHandler } from "~/utils/asyncHandler";
import { loginValidator, registerValidator } from "~/middlewares/users.middleware";
import { accessTokenValidator, authorizeRole, refreshTokenValidator } from "~/middlewares/auth.middleware";
import { Role } from "~/constants/enums";

const router = express.Router();

router.route("/me").post(accessTokenValidator, authorizeRole([Role.User, Role.Seller]), (req, res) => {
    res.status(200).json({ message: "Hello, you are authorized" });
});

router.route("/login").post(loginValidator, asyncHandler(AuthController.login));

router.route("/register").post(registerValidator, asyncHandler(AuthController.register));

router.route("/refreshToken").post(refreshTokenValidator, asyncHandler(AuthController.refreshToken));

export default router;
