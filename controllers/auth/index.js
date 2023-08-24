import {controllerWrapper} from "../../decorators/index.js";
import signIn from "./signIn.js";
import signUp from "./signUp.js";
import signOut from "./signOut.js";
import getCurrent from "./getCurrent.js";
import updateAvatar from "./updateAvatar.js";

export default {
    signUp: controllerWrapper(signUp),
    signIn: controllerWrapper(signIn),
    getCurrent: controllerWrapper(getCurrent),
    signOut: controllerWrapper(signOut),
    updateAvatar: controllerWrapper(updateAvatar),
}