import User from "../../models/user.js";

import {HttpError, cloudinary} from "../../helpers/index.js";

import bcrypt from "bcrypt";

import fs from "fs/promises";

import jwt from "jsonwebtoken";

import "dotenv/config";


const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, `Such email ${user.email} is already registered`);
    }

    // const {path: filePath} = req.file;
    // const {url: avatarURL} = await cloudinary.uploader.upload(filePath, {folder: "avatars"});

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        ...req.body, password: hashPassword,
        // avatarURL
    });

    // await fs.unlink(filePath);

    const payload = {
        id: newUser._id,
    };
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(newUser._id, {token});

    res.status(201).json({
        token,
        user: {
            name: newUser.name,
            email: newUser.email,
            userTheme: newUser.userTheme,
            // avatarURL,
        },
    })
};

export default signUp;

