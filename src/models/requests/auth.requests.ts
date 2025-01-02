export interface RefreshReqBody {
    refreshToken: string;
}

export interface HandleMultiPlatformParams {
    platform: "mobile" | "web";
    userAgent: string;
}