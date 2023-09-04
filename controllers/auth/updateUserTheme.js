import User from "../../models/user.js";

const updateUserTheme = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

    res.status(200).json({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: {
            _id: result._id,
            name: result.name,
            email: result.email,
            avatarURL: result.avatarURL,
            userTheme: result.userTheme,
        }
    });
};

export default updateUserTheme; 