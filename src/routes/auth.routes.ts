/* eslint-disable prettier/prettier */
import express from "express";
import AuthController from "~/controllers/auth.controller";
import { asyncHandler } from "~/utils/asyncHandler";
import { loginValidator, registerValidator } from "~/middlewares/users.middleware";
import { accessTokenValidator, authorizeRole, platformValidator, refreshTokenValidator, verifyEmailValidator } from "~/middlewares/auth.middleware";
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
 * Description. Register Email
 * Path: /register/email
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { email: string, username: string, password: string, confirm_password: string }
*/
router.route("/register").post(platformValidator, registerValidator, asyncHandler(AuthController.register));

/**
 * Description. Verify Email
 * Path: /verify-mail
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { verify_mail_token: string, opt: string }
*/
router.route("/verify-email").post(platformValidator, verifyEmailValidator, asyncHandler(AuthController.verifyMail));

/**
 * Description. Resend Verify Email
 * Path: /resend-verify-mail
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { verify_mail_token: string }
*/
router.route("/resend-verify-email").post(platformValidator, verifyEmailValidator, asyncHandler(AuthController.resendVerifyMail));


/**
 * Description. Refresh token
 * Path: /refreshToken
 * Method: POST
 * Headers: { Authorization: string, User-Agent: string }
 * Body: { refresh_token: string }
*/
router.route("/refresh-token").post(platformValidator, refreshTokenValidator, asyncHandler(AuthController.refreshToken));

/**
 * Description. Logout
 * Path: /logout
 * Method: POST
 * Headers: { Authorization: string, User-Agent: string }
 * Body: { refresh_token: string }
 */
router.route("/logout").post(platformValidator, accessTokenValidator, refreshTokenValidator, asyncHandler(AuthController.logout));


export default router;
