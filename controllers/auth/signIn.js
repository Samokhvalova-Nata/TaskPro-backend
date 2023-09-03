import User from "../../models/user.js";

import {HttpError} from "../../helpers/index.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import "dotenv/config";


const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const signIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: "2m"});
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {expiresIn: "7d"});
    await User.findByIdAndUpdate(user._id, {accessToken, refreshToken});

    res.status(200).json({
        accessToken,
        refreshToken,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatarURL: user.avatarURL,
            userTheme: user.userTheme,
        },
    });
};

export default signIn;