/* eslint-disable prettier/prettier */
import { makeInvoker } from 'awilix-express';
import express from 'express';
import { Role } from '~/constants/enums';
import container from '~/container';
import { UserController } from '~/controllers/users.controller';
import { accessTokenValidator, authorizeRole, platformValidator } from '~/middlewares/auth.middleware';
import { updateProfileValidator } from '~/middlewares/users.middleware';
import { asyncHandler } from '~/utils/asyncHandler';

const router = express.Router();
const api = makeInvoker<UserController>(() => container.resolve('usersController'))

router
    .route('/profile')
    /**
     * Description. Get user profile
     * Path: /profile
     * Method: GET
     * Headers: { Authorization: string, User-Agent: string }
     */
    .get(platformValidator, accessTokenValidator, authorizeRole([Role.User]), asyncHandler(api('getProfile')));

router
    .route('/profile/all')
    /**
     * Description. Get all users
     * Path: /profile/all
     * Method: GET
     * Body: {}
     */
    .get(platformValidator, accessTokenValidator, authorizeRole([Role.Admin]), asyncHandler(api('getAll')));

router
    .route('/profile/:user_id')
    /**
     * Description. Get user by id
     * Path: /profile/:user_id
     * Method: GET
     */
    .get(asyncHandler(api('getProfileById')));

router
    .route('/update-profile')
    /**
     * Description. Update user profile
     * Path: /update-profile
     * Method: PATCH
     * Headers: { Authorization: string, User-Agent: string }
     * Body: { name?: string, dob?: number, gender?: number, phone?: string }
     */
    .patch(
        platformValidator,
        updateProfileValidator,
        accessTokenValidator,
        authorizeRole([Role.User]),
        asyncHandler(api('updateProfile')),
    );

router
    .route('/upload-avatar')
    /**
     * Description. Upload avatar
     * Path: /upload-avatar
     * Method: POST
     * Content-type: multipart/form-data
     * Headers: { Authorization: string, User-Agent: string }
     */
    .post(
        platformValidator,
        accessTokenValidator,
        authorizeRole([Role.User]),
        asyncHandler(api('updateAvatar')),
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
//         asyncHandler(api('updateProfile')),
//     );

export default router;
