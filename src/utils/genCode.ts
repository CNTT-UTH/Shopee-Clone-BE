export const genCodeVerify = (): string => {
    let code = Math.floor(((Math.random() * 1e9) % 1000000) + 100000).toString();
    if (code.length > 6) {
        code = code.substring(0, 6);
    }
    return code;
};
