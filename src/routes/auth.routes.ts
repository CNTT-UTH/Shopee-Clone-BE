/* eslint-disable prettier/prettier */
import express from "express";
import AuthController from "~/controllers/auth.controller";
import { asyncHandler } from "~/utils/asyncHandler";
import { loginValidator, registerValidator } from "~/middlewares/users.middleware";
import { accessTokenValidator, authorizeRole, forgotPasswordValidator, platformValidator, refreshTokenValidator, resetPasswordValidator, verifyEmailValidator, verifyPasswordValidator } from "~/middlewares/auth.middleware";
import { Role } from "~/constants/enums";

const router = express.Router();

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
 * Body: { verify_email_token: string, opt: string }
*/
router.route("/verify-email").post(platformValidator, verifyEmailValidator, asyncHandler(AuthController.verifyMail));

/**
 * Description. Resend Verify Email
 * Path: /resend-verify-mail
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { verify_email_token: string }
*/
router.route("/resend-verify-email").post(platformValidator, verifyEmailValidator, asyncHandler(AuthController.resendVerifyMail));


/**
 * Description. Refresh token
 * Path: /refreshToken
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { refresh_token: string }
*/
router.route("/refresh-token").post(platformValidator, refreshTokenValidator, asyncHandler(AuthController.refreshToken));

/**
 * Description. Forgot password
 * Path: /forgot-password
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { username?: string, email?: string }
*/
router.route("/forgot-password").post(platformValidator, forgotPasswordValidator, asyncHandler(AuthController.forgotPassword));

/**
 * Description. Verify password
 * Path: /verify-password
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { forgot_password_token?: string, code?: string }
*/
router.route("/verify-password").post(platformValidator, verifyPasswordValidator, asyncHandler(AuthController.verifyForgotPassword));

/**
 * Description. Resend verify password
 * Path: /resend-verify-password
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { forgot_password_token?: string }
*/
router.route("/resend-verify-password").post(platformValidator, verifyPasswordValidator, asyncHandler(AuthController.resendForgotPassword));

/**
 * Description. Reset password
 * Path: /reset-password
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { forgot_password_token?: string, password: string}
*/
router.route("/reset-password").post(platformValidator, resetPasswordValidator, asyncHandler(AuthController.resetPassword));



/**
 * Description. Logout
 * Path: /logout
 * Method: POST
 * Headers: { Authorization: string, User-Agent: string }
 * Body: { refresh_token: string }
 */
router.route("/logout").post(platformValidator, accessTokenValidator, refreshTokenValidator, asyncHandler(AuthController.logout));


export default router;
