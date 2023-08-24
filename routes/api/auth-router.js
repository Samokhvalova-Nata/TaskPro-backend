import express from 'express';

import authController from "../../controllers/auth/index.js";

import {authenticate, isEmptyBody, upload} from "../../middlewars/index.js";

import {validateBody} from "../../decorators/index.js";

import usersSchemas from "../../schemas/usersSchemas.js";


const authRouter = express.Router();

authRouter.post('/signup', validateBody(usersSchemas.userSignupSchema), authController.signUp);

authRouter.post('/signin', validateBody(usersSchemas.userSigninSchema), authController.signIn);

authRouter.post("/signout", authenticate, authController.signOut);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);

authRouter.patch("/", authenticate, isEmptyBody, validateBody(usersSchemas.updateUserThemeSchema), authController.updateUserTheme);

export default authRouter;