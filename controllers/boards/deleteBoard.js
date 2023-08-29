import { HttpError } from "../../helpers/index.js";
import Board from "../../models/board.js";

const deleteBoard = async (req, res) => {
    const { id } = req.params;

    const result = Board.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, `Board with id=${id} not found`);
    }
    res.status(200).json({ message: "Board deleted" });
};

export default deleteBoard;
