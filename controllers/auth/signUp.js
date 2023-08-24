import User from "../../models/user.js";

import {HttpError} from "../../helpers/index.js";

import gravatar from "gravatar";

import bcrypt from "bcrypt";


const signUp = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, `Such email ${user.email} is already registered`);
    }

    const avatarURL = gravatar.url(email)
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
            avatarURL,
        },
    })
};

export default signUp
