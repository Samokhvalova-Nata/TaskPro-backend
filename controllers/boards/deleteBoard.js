import { HttpError } from "../../helpers/index.js";
import Board from "../../models/board.js";
import Column from "../../models/column.js";
import Card from "../../models/card.js";

const deleteBoard = async (req, res) => {
    const { id } = req.params;

    const result = await Board.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, `Board with id=${id} not found`);
    }

    const deletedColumn = await Column.find({ board: id });
    if (deletedColumn) {
            deletedColumn.forEach(async (_id) => {
                await Card.deleteMany({ column: _id });
            });
        await Column.deleteMany({ board: id });
    }

    res.status(200).json({message: "Board deleted", deletedId: result._id });
};

export default deleteBoard;
