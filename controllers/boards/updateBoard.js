import Board from "../../models/board.js";
import { HttpError } from "../../helpers/index.js";
import fetchFromCloudinary from "../../helpers/fetchFromCloudinary.js";

const updateBoard = async (req, res) => {
    const { id } = req.params;
    const { background } = req.body;

    const updateBoardData = { ...req.body };

    if (background ) {
        updateBoardData.backgroundURL = await fetchFromCloudinary(background);
    }

    const result = await Board.findByIdAndUpdate(id, updateBoardData, { new: true });
    if (!result) {
        throw HttpError(404, `Board with id=${id} not found`)
    }

    res.json(result);
};

export default updateBoard;
