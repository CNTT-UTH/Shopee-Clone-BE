/* eslint-disable prettier/prettier */
import express from "express";
import { Role } from "~/constants/enums";
import usersController from "~/controllers/users.controller";
import { accessTokenValidator, authorizeRole, platformValidator } from "~/middlewares/auth.middleware";
import { asyncHandler } from "~/utils/asyncHandler";

const router = express.Router();

/**
 * Description. Get user profile
 * Path: /profile
 * Method: GET
 * Headers: { Authorization: string, User-Agent: string }
 */
router
    .route("/profile")
    .get(platformValidator, accessTokenValidator, authorizeRole([Role.User]), asyncHandler(usersController.getProfile));

export default router;
