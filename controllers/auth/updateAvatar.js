import path from "path";

import Jimp from "jimp";

import fs from "fs/promises";

import User from "../../models/user.js";


const avatarPath = path.resolve("public", "avatars");
const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: oldPath, filename} = req.file;
    const newPath = path.join(avatarPath, filename);

    const resizedAvatar = await Jimp.read(oldPath);
    resizedAvatar.resize(250, 250);
    resizedAvatar.write(oldPath);

    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, {avatarURL})

    res.status(200).json({avatarURL});

}

export default updateAvatar