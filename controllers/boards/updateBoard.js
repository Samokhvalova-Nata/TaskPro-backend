import Board from "../../models/board.js";
import { HttpError } from "../../helpers/index.js";

const updateBoard = async (req, res) => {
    const { id } = req.params;
    const result = await Board.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Board with id=${id} not found`)
    }

    // TODO download background from Cloudinary

    res.json(result);
};

export default updateBoard;
