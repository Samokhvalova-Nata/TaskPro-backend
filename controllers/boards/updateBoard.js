import Board from "../../models/board.js";
import { HttpError } from "../../helpers/index.js";
import fetchFromCloudinary from "../../helpers/fetchFromCloudinary.js";

const updateBoard = async (req, res) => {
    const { id } = req.params;
    const { background } = req.body;

    // TODO download background from Cloudinary
    // if (background !== "no-background") {
    //     const updateBcg = await fetchFromCloudinary(background)
    // }
    // TODO backgroundURL in board modal
    const result = await Board.findByIdAndUpdate(id, req.body, { new: true });
    // const result = await Board.findByIdAndUpdate(id,{ ...req.body, backgroundURL: updateBcg }, { new: true });
    if (!result) {
        throw HttpError(404, `Board with id=${id} not found`)
    }


    res.json(result);
};

export default updateBoard;
