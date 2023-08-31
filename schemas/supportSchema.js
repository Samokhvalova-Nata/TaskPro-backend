import Joi from "joi";
import {emailRegexp} from "../constants/user-constants.js";

export const supportSchema = Joi.object({
    email: Joi.string()
        .pattern(emailRegexp)
        .required()
        .messages({
            "any.required": `"email" must be exist`
        }),
    comment: Joi.string()
        .min(1)
        .required()
        .messages({
            "any.required": `write your comment`
        }),
});
