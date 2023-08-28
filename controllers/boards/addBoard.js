import Board from "../../models/board.js";

const addBoard = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Board.create({ ...req.body, owner });
    res.status(201).json(result);
};

export default addBoard;