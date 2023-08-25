import User from "../../models/user.js";

import {HttpError, cloudinary} from "../../helpers/index.js";

const updateProfile = async (req, res) => {
    const {_id, token} = req.user;
    let {name, email, password, avatarURL} = req.body;

    name = name || req.user.name;
    email = email || req.user.email;
    password = password || req.user.password;
    avatarURL = avatarURL || req.user.avatarURL;

    if (!token) {
        throw HttpError(401);
    }

    if (req.file) {
        avatarURL = req.file.path;

        if (avatarURL !== "") {
            await cloudinary.uploader.upload(avatarURL, {folder: "avatars"});
        }
    }
    await User.findByIdAndUpdate(_id, {name, email, password, avatarURL});


    res.status(201).json({name, email, password, avatarURL})
};

export default updateProfile;
