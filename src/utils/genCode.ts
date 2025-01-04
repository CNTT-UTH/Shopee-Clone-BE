export const genCodeVerify = (): string => {
    let code = Math.floor(Math.random() * 1000000).toString();
    if (code.length > 6) {
        code = code.substring(0, 6);
    }
    return code;
};
