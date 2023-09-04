import User from "../../models/user.js";


const signOut = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {accessToken: "", refreshToken: ""});

    res.status(204).json({message: "Successful signOut"})
};

export default signOut;