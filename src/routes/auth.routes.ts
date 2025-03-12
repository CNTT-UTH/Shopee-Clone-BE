/* eslint-disable prettier/prettier */
import express from 'express';
import { AuthController } from '~/controllers/auth.controller';
import { asyncHandler } from '~/utils/asyncHandler';
import { loginValidator, registerValidator } from '~/middlewares/users.middleware';
import {
    accessTokenValidator,
    authorizeRole,
    forgotPasswordValidator,
    platformValidator,
    refreshTokenValidator,
    resetPasswordValidator,
    verifyEmailValidator,
    verifyPasswordValidator,
} from '~/middlewares/auth.middleware';
import { Role } from '~/constants/enums';
import { makeInvoker } from 'awilix-express';
import container from '~/container';

const router = express.Router();
const api = makeInvoker(() => container.resolve('authController'))
/**
 * Description. Login
 * Path: /login
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { email?: string, username?: string, password: string }
 */
router.route('/login').post(platformValidator, loginValidator, api('login'));

/**
 * Description. Register Email
 * Path: /register/email
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { email: string, username: string, password: string, confirm_password: string }
 */
router.route('/register').post(platformValidator, registerValidator, asyncHandler(api('register')));

/**
 * Description. Verify Email
 * Path: /verify-mail
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { verify_email_token: string, opt: string }
 */
router.route('/verify-email').post(platformValidator, verifyEmailValidator, asyncHandler(api('verifyMail')));

/**
 * Description. Resend Verify Email
 * Path: /resend-verify-mail
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { verify_email_token: string }
 */
router
    .route('/resend-verify-email')
    .post(platformValidator, verifyEmailValidator, asyncHandler(api('resendVerifyMail')));

/**
 * Description. Refresh token
 * Path: /refreshToken
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { refresh_token: string }
 */
router
    .route('/refresh-token')
    .post(platformValidator, refreshTokenValidator, asyncHandler(api('refreshToken')));

/**
 * Description. Forgot password
 * Path: /forgot-password
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { username?: string, email?: string }
 */
router
    .route('/forgot-password')
    .post(platformValidator, forgotPasswordValidator, asyncHandler(api('forgotPassword')));

/**
 * Description. Verify password
 * Path: /verify-password
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { forgot_password_token?: string, code?: string }
 */
router
    .route('/verify-password')
    .post(platformValidator, verifyPasswordValidator, asyncHandler(api('verifyForgotPassword')));

/**
 * Description. Resend verify password
 * Path: /resend-verify-password
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { forgot_password_token?: string }
 */
router
    .route('/resend-verify-password')
    .post(platformValidator, verifyPasswordValidator, asyncHandler(api('resendForgotPassword')));

/**
 * Description. Reset password
 * Path: /reset-password
 * Method: POST
 * Headers: { User-Agent: string }
 * Body: { forgot_password_token?: string, password: string}
 */
router
    .route('/reset-password')
    .post(platformValidator, resetPasswordValidator, asyncHandler(api('resetPassword')));

/**
 * Description. Logout
 * Path: /logout
 * Method: POST
 * Headers: { Authorization: string, User-Agent: string }
 * Body: { refresh_token: string }
 */
router
    .route('/logout')
    .post(platformValidator, accessTokenValidator, refreshTokenValidator, asyncHandler(api('logout')));

export default router;
