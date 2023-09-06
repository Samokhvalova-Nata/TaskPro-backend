import Column from "../../models/column.js";
import {HttpError} from "../../helpers/index.js";
import Board from "../../models/board.js";

const addColumn = async (req, res) => {
    const { board: boardId, title } = req.body;

    const existingColumn = await Column.findOne({ title, board: boardId });
    const existingBoard = await Board.findById(boardId);

    if (!existingBoard) {
        throw HttpError(404, `Such board with id ${boardId} does not exist`)
    }
    if (existingColumn) {
        throw HttpError(409, `Such column with title ${title} has already been added to this Board`);
    }
    const result = await Column.create({
        ...req.body,
    });
    res.status(201).json(result);
};

export default addColumn;