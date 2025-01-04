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
