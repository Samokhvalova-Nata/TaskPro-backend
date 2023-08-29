import Board from "../../models/board.js";

const addBoard = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Board.create({ ...req.body, owner });

// TODO download background from Cloudinary

    res.status(201).json(result);
};

export default addBoard;