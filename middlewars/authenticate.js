import jwt from "jsonwebtoken";

import "dotenv/config";

import User from "../models/user.js";

import {HttpError} from "../helpers/index.js";

import {controllerWrapper} from "../decorators/index.js";

const { ACCESS_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (!token || bearer !== "Bearer") {
        throw(HttpError(401))
    }
    try {
        const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
        const user = await User.findById(id);

        if (!user || !user.accessToken || user.accessToken !== token) {
            throw(HttpError(401))
        }
        req.user = user;
        next();
    } catch (error) {
        throw(HttpError(401))
    }
};

export default controllerWrapper(authenticate);