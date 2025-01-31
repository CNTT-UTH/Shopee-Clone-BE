import { plainToClass, plainToInstance } from "class-transformer"
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express"
import HTTP_STATUS from "~/constants/httpStatus";
import { USERS_MESSAGES } from "~/constants/messages";
import { ApiError } from "~/utils/errors";

export const validationMiddleware = (dtoClass: any) => {
     return async (req: Request, res: Response, next: NextFunction) => {

          const dtoInstance = plainToInstance(dtoClass, req.body);

          const errors = await validate(dtoInstance);

          console.log(errors);

          if (errors.length > 0) {
               throw new ApiError(USERS_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.UNPROCESSABLE_ENTITY)
          }

          next();
     }
}