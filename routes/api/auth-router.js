import express from 'express';

import authController from "../../controllers/auth/index.js";

import {authenticate, isEmptyBody, upload} from "../../middlewars/index.js";

import {validateBody} from "../../decorators/index.js";

import usersSchemas from "../../schemas/usersSchemas.js";

import {supportSchema} from "../../schemas/supportSchema.js";


const authRouter = express.Router();

authRouter.post('/signup', validateBody(usersSchemas.userSignupSchema), authController.signUp);

authRouter.post('/signin', validateBody(usersSchemas.userSigninSchema), authController.signIn);

authRouter.post("/signout", authenticate, authController.signOut);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.put("/update", authenticate, upload.single("avatar"), validateBody(usersSchemas.updateUserSchema), authController.updateProfile);

authRouter.patch("/", authenticate, isEmptyBody, validateBody(usersSchemas.updateUserThemeSchema), authController.updateUserTheme);

authRouter.post("/refresh", validateBody(usersSchemas.refreshSchema), authController.refresh);

authRouter.post("/support", authenticate, validateBody(supportSchema),authController.getHelpEmail);

export default authRouter;
