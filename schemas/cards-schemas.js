import Joi from "joi";
import { priorityList, deadlineRegex } from "../constants/card-constants.js";


const cardAddSchema = Joi.object({
    title: Joi.string().required()
        .messages({
            "any.required": `missing required "title" field`,
        }),
    description: Joi.string().required()
        .messages({
            "any.required": `missing required "description" field`,
        }),
    priority: Joi.string().valid(...priorityList),
    deadline: Joi.string().pattern(deadlineRegex),
    column: Joi.string().required()
        .messages({
            "any.required": `missing required "column" field`,
        }),
});

const cardUpdateSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    priority: Joi.string().valid(...priorityList),
    deadline: Joi.string().pattern(deadlineRegex),
});

// TODO add transportSchema

export default {
    cardAddSchema,
    cardUpdateSchema
};
