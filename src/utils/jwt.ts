import jwt from 'jsonwebtoken';
import { TokenPayload } from '~/models/requests/users.requests';
import { ApiError } from './errors';
import HTTP_STATUS from '~/constants/httpStatus';
import { AUTH_MESSAGES } from '~/constants/messages';

export const signToken = ({
    payload,
    privateKey,
    options = { algorithm: 'HS256' },
}: {
    payload: string | Buffer | object;
    privateKey: string;
    options?: jwt.SignOptions;
}) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, privateKey, options, (err, token) => {
            if (err) throw reject(err);

            resolve(token as string);
        });
    });
};

export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
    return new Promise<TokenPayload>((resolve, reject) => {
        jwt.verify(token, secretOrPublicKey, (err, decoded) => {
            if (err) throw reject(new ApiError(AUTH_MESSAGES.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED));

            resolve(decoded as TokenPayload);
        });
    });
};
