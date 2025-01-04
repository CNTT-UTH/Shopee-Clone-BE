export interface RefreshReqBody {
    refreshToken: string;
}

export interface HandleMultiPlatformParams {
    platform: "mobile" | "web";
    user_agent: string;
}

export interface EmailVerifyReqBody {
    verify_email_token: string;
    code: string;
}

export interface ForgotPasswordReqBody {
    username?: string;
    email?: string;
}

export interface VerifyPasswordReqBody {
    forgot_password_token?: string;
    code?: string;
}

export interface ResetPasswordReqBody {
    forgot_password_token?: string;
    password: string;
}