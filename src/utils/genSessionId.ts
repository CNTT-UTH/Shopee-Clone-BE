export const genSession = () => {
    const result: string = (Math.random() * 1000000).toString(32).substring(0, 15);

    return result;
};
