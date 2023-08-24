import User from "../../models/user.js";

import {HttpError} from "../../helpers/index.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import "dotenv/config";


const {JWT_SECRET} = process.env;

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

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.status(200).json({
        token, user: {
            name: user.name,
            email: user.email,
        },
    });
};

export default signIn