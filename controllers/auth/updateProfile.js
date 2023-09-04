import User from "../../models/user.js";
import bcrypt from "bcrypt";
import { uploadToCloudinary, HttpError } from "../../helpers/index.js";

const updateProfile = async (req, res) => {
    const { _id, name: oldName, email: oldEmail } = req.user;
    const { name: newName, email: newEmail, password } = req.body;

    const updateUserData = {};

    if (newName && newName !== oldName) {
        updateUserData.name = newName;
    }

    if (newEmail && newEmail !== oldEmail) {
        const user = await User.findOne({ email: newEmail });
        if (user) {
            throw HttpError(
                409,
                `Such email ${user.email} is already registered`
            );
        }
        updateUserData.email = newEmail;
        updateUserData.accessToken = "";
        updateUserData.refreshToken = "";
    }

    if (password) {
        updateUserData.password = await bcrypt.hash(password, 10);
        updateUserData.accessToken = "";
        updateUserData.refreshToken = "";
    }

    if (req.file) {
        updateUserData.avatarURL = await uploadToCloudinary(req);
    }

    if (updateUserData) {
        const updateUser = await User.findByIdAndUpdate(_id, updateUserData, { new: true });

        res.status(200).json({
            accessToken: updateUser.accessToken,
            refreshToken: updateUser.refreshToken,
            user: {
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                avatarURL: updateUser.avatarURL,
                userTheme: updateUser.userTheme,
            }
    })
    } else {
        throw HttpError(400, 'Such data is already in use')
    }
};

export default updateProfile;
