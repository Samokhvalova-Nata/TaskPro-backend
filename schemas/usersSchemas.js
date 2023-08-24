import Joi from "joi";

import {emailRegexp, themeList} from "../constants/user-constants.js";


const userSignupSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "any.required": `"name" must be exist`
        }),
    email: Joi.string()
        .pattern(emailRegexp)
        .required()
        .messages({
            "any.required": `"email" must be exist`
        }),
    password: Joi.string()
        .min(8)
        .max(64)
        .required()
        .messages({
            "any.required": `"password" must be exist`
        })
});

const userSigninSchema = Joi.object({
    email: Joi.string()
        .pattern(emailRegexp)
        .required()
        .messages({
            "any.required": `"email" must be exist`
        }),
    password: Joi.string()
        .min(8)
        .max(64)
        .required()
        .messages({
            "any.required": `"password" must be exist`
        })
})

const themeSchema = Joi.object({
    theme: Joi.string()
        .valid(...themeList)
});

export default {
    userSignupSchema,
    userSigninSchema,
    themeSchema
}