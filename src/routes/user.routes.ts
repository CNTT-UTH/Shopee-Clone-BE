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
    .route("/profile/all")
    /**
     * Description. Get all users
     * Path: /profile/all
     * Method: GET
     * Body: {}
     */
    .get(
        platformValidator,
        accessTokenValidator,
        authorizeRole([Role.Admin]),
        asyncHandler(usersController.getAll),
    );

router
    .route("/profile/:user_id")
    /**
     * Description. Get user by id
     * Path: /profile/:user_id
     * Method: GET
     */
    .get(asyncHandler(usersController.getProfileById));

router
    .route("/update_profile")
    /**
     * Description. Update user profile
     * Path: /update_profile
     * Method: PATCH
     * Headers: { Authorization: string, User-Agent: string }
     * Body: { name?: string, dob?: number, gender?: number, phone?: string }
     */
    .patch(
        platformValidator,
        updateProfileValidator,
        accessTokenValidator,
        authorizeRole([Role.User]),
        asyncHandler(usersController.updateProfile),
    );

// router
//     .route("/remove_my_account")
//     /**
//      * Description. Delete user account
//      * Path: /remove_my_account
//      * Method: PATCH
//      * Headers: { Authorization: string, User-Agent: string }
//      */
//     .delete(
//         platformValidator,
//         accessTokenValidator,
//         authorizeRole([Role.User]),
//         asyncHandler(usersController.updateProfile),
//     );

export default router;
