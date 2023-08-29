import {controllerWrapper} from "../../decorators/index.js";

import getColumnById from "./getColumnById.js";
import addColumn from "./addColumn.js";
import updateColumn from "./updateColumn.js";
import deleteColumn from "./deleteColumn.js";


export default {
    getColumnById: controllerWrapper(getColumnById),
    addColumn: controllerWrapper(addColumn),
    updateColumn: controllerWrapper(updateColumn),
    deleteColumn: controllerWrapper(deleteColumn),
};