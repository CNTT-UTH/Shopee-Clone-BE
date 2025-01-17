/* eslint-disable prettier/prettier */
import express from "express";
import { Role } from "~/constants/enums";
import usersController from "~/controllers/users.controller";
import { accessTokenValidator, authorizeRole, platformValidator } from "~/middlewares/auth.middleware";
import { updateProfileValidator } from "~/middlewares/users.middleware";
import { asyncHandler } from "~/utils/asyncHandler";

const router = express.Router();


router
    .route("/profile")
    /**
     * Description. Get user profile
     * Path: /profile
     * Method: GET
     * Headers: { Authorization: string, User-Agent: string }
     */
    .get(platformValidator, accessTokenValidator, authorizeRole([Role.User]), asyncHandler(usersController.getProfile));


    
router
    .route("/updateProfile")
    /**
     * Description. Update user profile
     * Path: /updateProfile
     * Method: PATCH
     * Headers: { Authorization: string, User-Agent: string }
    */
   .patch(platformValidator, updateProfileValidator, accessTokenValidator, authorizeRole([Role.User]), asyncHandler(usersController.updateProfile))
   
router
    .route("/:user_id")
    /**
    * Description. Get users 
    * Path: /:user_id
    * Method: GET
    * Headers: { Authorization: string, User-Agent: string }
    * Query: { user_id: string }
    */
    .get(platformValidator, accessTokenValidator, authorizeRole([Role.Admin]), asyncHandler(usersController.getProfile));
   
   export default router;
