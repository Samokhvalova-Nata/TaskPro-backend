import {HttpError} from "../../helpers/index.js";
import Column from "../../models/column.js";

const updateColumn = async (req, res) => {
    const { id } = req.params;
    const { board: boardId, title } = req.body;

    const existingColumn = await Column.findOne({ title, board: boardId });
    if (existingColumn) {
        throw HttpError(409, `Such column with title ${title} has already been added to this Board`);
    }

    const result = await Column.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Such column with id ${id} not found`);
    }
    res.json(result);
};

export default updateColumn;