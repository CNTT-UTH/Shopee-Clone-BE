import { plainToClass, plainToInstance } from "class-transformer"
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express"
import HTTP_STATUS from "~/constants/httpStatus";
import { USERS_MESSAGES } from "~/constants/messages";
import { ApiError } from "~/utils/errors";

export const validationMiddleware = (dtoClass: any) => {
     return async (req: Request, res: Response, next: NextFunction) => {
          try {
               const dtoInstance = plainToInstance(dtoClass, req.body);
     
               const errors = await validate(dtoInstance);
     
               console.log(errors);
     
               if (errors.length > 0) {
                    const errorMessages = errors.map((error) => {return {
                         property: error.property,
                         value: error.value,
                         contraints: error.constraints
                    }})
                    throw new ApiError(USERS_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.UNPROCESSABLE_ENTITY, errorMessages)
               }
               
               next();
          } catch (error) {
               next(error);
          }


     }
}