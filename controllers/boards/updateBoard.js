import Board from "../../models/board.js";
import { HttpError } from "../../helpers/index.js";
import { v2 as cloudinary } from "cloudinary";

const updateBoard = async (req, res) => {
    const { id } = req.params;
    const { background } = req.body;
    const result = await Board.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Board with id=${id} not found`)
    }

    // TODO download background from Cloudinary
    await cloudinary.api.resources_by_tag(background, (error, result) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log(`Resources with tag ${background}:`, result.resources);
    }
});;

    res.json(result);
};

export default updateBoard;
