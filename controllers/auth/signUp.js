import User from "../../models/user.js";

import {HttpError} from "../../helpers/index.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import "dotenv/config";


const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, `Such email ${user.email} is already registered`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        ...req.body, password: hashPassword,
    });

    const payload = {
        id: newUser._id,
    };
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(newUser._id, {token});

    res.status(201).json({
        token,
        user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatarURL: newUser.avatarURL,
            userTheme: newUser.userTheme,
        },
    })
};

export default signUp;

