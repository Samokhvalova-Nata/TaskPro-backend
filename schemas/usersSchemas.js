import Joi from "joi";

import {emailRegexp} from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .pattern(emailRegexp)
        .required()
        .messages({
            "any.required": `"email" must be exist`
        }),
    password: Joi.string()
        .required()
        .messages({
            "any.required": `"password" must be exist`
        })
});

const userSigninSchema = Joi.object({
    email: Joi.string()
        .pattern(emailRegexp)
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
})

export default {
    userSignupSchema,
    userSigninSchema
}