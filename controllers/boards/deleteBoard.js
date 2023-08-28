import { HttpError } from "../../helpers/index.js";
import Board from "../../models/board.js";

const deleteBoard = async (req, res) => {
    const { boardId } = req.params;
    console.log('boardId', boardId)
    const result = Board.findByIdAndRemove(boardId);
    if (!result) {
        throw HttpError(404, `Board with id=${boardId} not found`);
    }
    res.status(200).json({ message: "Board deleted" });
};

export default deleteBoard;
