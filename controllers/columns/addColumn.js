import Column from "../../models/column.js";
import {HttpError} from "../../helpers/index.js";

const addColumn = async (req, res) => {
    const {title, board} = req.body;
    const existingColumn = await Column.findOne({
        board,
        title
    });
    if (existingColumn) {
        throw HttpError(409, `Such column with title ${title} is already added`);
    }
    const result = await Column.create({
        ...req.body,
    });
    res.status(201).json(result);
};

export default addColumn;