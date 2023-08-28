import express from "express";
import boardsController from "../../controllers/boards/index.js"
import { authenticate, isEmptyBody, isValidId } from "../../middlewars/index.js";
import { validateBody } from "../../decorators/index.js";
import boardSchema from "../../schemas/boards-schemas.js";


const boardsRouter = express.Router();

boardsRouter.use(authenticate);

boardsRouter.get("/", boardsController.getAllBoards);

boardsRouter.get("/:boardId", isValidId, boardsController.getBoardById);

boardsRouter.post("/", isEmptyBody, validateBody(boardSchema.boardAddSchema), boardsController.addBoard);

boardsRouter.delete("/:boardId", isValidId, boardsController.deleteBoard);

boardsRouter.put("/:boardId", isValidId, isEmptyBody, validateBody(boardSchema.boardAddSchema), boardsController.updateBoard);

boardsRouter.patch("/:boardId/transport", isValidId, isEmptyBody, boardsController.transportBoard);
// TODO add transportSchema

export default boardsRouter;