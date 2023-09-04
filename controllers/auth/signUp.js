import User from "../../models/user.js";

import {HttpError} from "../../helpers/index.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import "dotenv/config";


const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

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
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: "2m"});
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {expiresIn: "7d"});
    await User.findByIdAndUpdate(newUser._id, {accessToken, refreshToken});

    res.status(201).json({
        accessToken,
        refreshToken,
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

