import Board from "../../models/board.js";

const getAllBoards = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Board.find({ owner }, "-createdAt -updatedAt")
        .populate("owner", "-createdAt -updatedAt -token -accessToken -refreshToken -password");
    
    res.json(result);
};

export default getAllBoards;
