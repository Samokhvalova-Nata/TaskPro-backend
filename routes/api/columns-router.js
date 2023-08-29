import express from 'express';

import {authenticate, isValidId} from "../../middlewars/index.js";

import {validateBody} from "../../decorators/index.js";

import columnsController from "../../controllers/columns/index.js";

import columnsSchema from "../../schemas/columnsSchema.js";


const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.get("/:id", isValidId, columnsController.getColumnById);

columnsRouter.post("/", validateBody(columnsSchema.columnsAddSchema), columnsController.addColumn);

columnsRouter.put("/:id", isValidId, validateBody(columnsSchema.columnsUpdateSchema), columnsController.updateColumn);

columnsRouter.delete("/:id", isValidId, columnsController.deleteColumn);

export default columnsRouter;