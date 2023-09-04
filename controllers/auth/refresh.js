import jwt from "jsonwebtoken";

import "dotenv/config";

import {HttpError} from "../../helpers/index.js";

import User from "../../models/user.js";

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
    const {refreshToken: token} = req.body;
    try {
        const {id} = jwt.verify(token, REFRESH_SECRET_KEY);
        const isExist = await User.findOne({refreshToken: token});
        if (!isExist) {
            throw HttpError(403, "Invalid token")
        }

        const payload = {
            id
        };

        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: "2m"});
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
        await User.findByIdAndUpdate(id, { accessToken, refreshToken });

        res.status(200).json({
            accessToken,
            refreshToken
        });
    } catch (error) {
        throw HttpError(403, error.message)
    }
};

export default refresh;