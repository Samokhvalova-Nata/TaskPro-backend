import express from "express";
import boardsController from "../../controllers/boards/index.js"
import { authenticate, isEmptyBody, isValidId } from "../../middlewars/index.js";
import { validateBody } from "../../decorators/index.js";
import boardSchema from "../../schemas/boards-schemas.js";


const boardsRouter = express.Router();

boardsRouter.use(authenticate);

boardsRouter.get("/", boardsController.getAllBoards);

boardsRouter.get("/:id", isValidId, boardsController.getBoardById);

boardsRouter.post("/", isEmptyBody, validateBody(boardSchema.boardAddSchema), boardsController.addBoard);

boardsRouter.delete("/:id", isValidId, boardsController.deleteBoard);

boardsRouter.put("/:id", isValidId, isEmptyBody, validateBody(boardSchema.boardUpdateSchema), boardsController.updateBoard);


export default boardsRouter;