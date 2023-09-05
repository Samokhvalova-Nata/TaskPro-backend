import { HttpError } from "../../helpers/index.js";
import Board from "../../models/board.js";
import Column from "../../models/column.js";

const deleteBoard = async (req, res) => {
    const { id } = req.params;

    const result = await Board.findByIdAndRemove(id);
    console.log(result)
    if (!result) {
        throw HttpError(404, `Board with id=${id} not found`);
    }

    await Column.deleteMany({ board: id });

    // TODO delete cards
    res.status(200).json( {message: "Board deleted", deletedId: result._id });
};

export default deleteBoard;
