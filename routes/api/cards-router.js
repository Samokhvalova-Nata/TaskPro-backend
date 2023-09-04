import express from "express";
import cardsController from "../../controllers/cards/index.js"
import { authenticate, isEmptyBody, isValidId } from "../../middlewars/index.js";
import { validateBody } from "../../decorators/index.js";
import cardSchema from "../../schemas/cards-schemas.js";


const cardsRouter = express.Router();

cardsRouter.use(authenticate);

cardsRouter.post("/", isEmptyBody, validateBody(cardSchema.cardAddSchema), cardsController.addCard);

cardsRouter.delete("/:id", isValidId, cardsController.deleteCard);

cardsRouter.put("/:id", isValidId, isEmptyBody, validateBody(cardSchema.cardUpdateSchema), cardsController.updateCard);

cardsRouter.patch("/:id/transport", isValidId, isEmptyBody, validateBody(cardSchema.cardTransportSchema), cardsController.transportCard);


export default cardsRouter;