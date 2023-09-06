import {controllerWrapper} from "../../decorators/index.js";
import getAllBoards from "./getAllBoards.js";
import getBoardById from "./getBoardById.js";
import addBoard from "./addBoard.js";
import deleteBoard from "./deleteBoard.js";
import updateBoard from "./updateBoard.js";


export default {
    getAllBoards: controllerWrapper(getAllBoards),
    getBoardById: controllerWrapper(getBoardById),
    addBoard: controllerWrapper(addBoard),
    deleteBoard: controllerWrapper(deleteBoard),
    updateBoard: controllerWrapper(updateBoard),
};