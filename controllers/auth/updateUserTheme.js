import User from "../../models/user.js";

const updateUserTheme = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

    res.status(200).json({
        user: {
            name: result.name,
            email: result.email,
            userTheme: result.userTheme,
        }
    });
};

export default updateUserTheme;