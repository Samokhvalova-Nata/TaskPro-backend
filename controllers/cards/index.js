import {controllerWrapper} from "../../decorators/index.js";
import addCard from "./addCard.js";
import deleteCard from "./deleteCard.js";
import updateCard from "./updateCard.js";
import transportCard from "./transportCard.js";


export default {
    addCard: controllerWrapper(addCard),
    deleteCard: controllerWrapper(deleteCard),
    updateCard: controllerWrapper(updateCard),
    transportCard: controllerWrapper(transportCard),
};