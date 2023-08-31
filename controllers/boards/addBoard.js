import Board from "../../models/board.js";
import fetchFromCloudinary from "../../helpers/fetchFromCloudinary.js";

const addBoard = async (req, res) => {
    const { _id: owner } = req.user;
    const { background } = req.body;

    const boardData = { ...req.body };

    if (background) {
        boardData.backgroundURL = await fetchFromCloudinary(background);
    }

    const result = await Board.create({ ...boardData, owner });

    res.status(201).json(result);
};

export default addBoard;