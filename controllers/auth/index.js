import {controllerWrapper} from "../../decorators/index.js";
import signIn from "./signIn.js";
import signUp from "./signUp.js";
import signOut from "./signOut.js";
import getCurrent from "./getCurrent.js";
import updateUserTheme from "./updateUserTheme.js";
import updateProfile from "./updateProfile.js";
import getHelpEmail from "./getHelpEmail.js";
import refresh from "./refresh.js";

export default {
    signUp: controllerWrapper(signUp),
    signIn: controllerWrapper(signIn),
    getCurrent: controllerWrapper(getCurrent),
    signOut: controllerWrapper(signOut),
    updateUserTheme: controllerWrapper(updateUserTheme),
    updateProfile: controllerWrapper(updateProfile),
    getHelpEmail: controllerWrapper(getHelpEmail),
    refresh: controllerWrapper(refresh),

};