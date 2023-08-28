import {controllerWrapper} from "../../decorators/index.js";
import getAllBoards from "./getAllBoards.js";
import getBoardById from "./getBoardById.js";
import addBoard from "./addBoard.js";
import deleteBoard from "./deleteBoard.js";
import updateBoard from "./updateBoard.js";
import transportBoard from "./transportBoard.js";


export default {
    getAllBoards: controllerWrapper(getAllBoards),
    getBoardById: controllerWrapper(getBoardById),
    deleteBoard: controllerWrapper(deleteBoard),
    addBoard: controllerWrapper(addBoard),
    updateBoard: controllerWrapper(updateBoard),
    transportBoard: controllerWrapper(transportBoard),
};