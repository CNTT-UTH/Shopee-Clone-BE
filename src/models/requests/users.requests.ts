export interface RegisterReqBody {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface LoginReqBody {
    username?: string;
    email?: string;
    password: string;
}
