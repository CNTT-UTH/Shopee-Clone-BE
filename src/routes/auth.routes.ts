/* eslint-disable prettier/prettier */
import express from "express";
import AuthController from "~/controllers/auth.controller";
import { asyncHandler } from "~/utils/asyncHandler";
import { loginValidator, registerValidator } from "~/middlewares/users.middleware";
import { accessTokenValidator, authorizeRole, platformValidator, refreshTokenValidator } from "~/middlewares/auth.middleware";
import { Role } from "~/constants/enums";

const router = express.Router();

/**
 * Description. Verify if the user is authorized
 * Path: /me
 * Method: POST
 * Headers: { Authorization: string, User-Agent: string }
*/
router.route("/me").post(platformValidator, accessTokenValidator, authorizeRole([Role.User, Role.Seller]), (req, res) => {
    res.status(200).json({ message: "Hello, you are authorized" });
});

/**
 * Description. Login
 * Path: /login
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { email?: string, username?: string, password: string }
*/
router.route("/login").post(platformValidator, loginValidator, asyncHandler(AuthController.login));

/**
 * Description. Register
 * Path: /register
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { email: string, username: string, password: string, confirmPassword: string }
*/
router.route("/register").post(platformValidator, registerValidator, asyncHandler(AuthController.register));

/**
 * Description. Refresh token
 * Path: /refreshToken
 * Method: POST
 * Headers: { Authorization: string, User-Agent: string }
 * Body: { refreshToken: string }
*/
router.route("/refreshToken").post(platformValidator, refreshTokenValidator, asyncHandler(AuthController.refreshToken));

/**
 * Description. Logout
 * Path: /logout
 * Method: POST
 * Headers: { Authorization: string, User-Agent: string }
 * Body: { refreshToken: string }
 */
router.route("/logout").post(platformValidator, accessTokenValidator, refreshTokenValidator, asyncHandler(AuthController.logout));


export default router;
