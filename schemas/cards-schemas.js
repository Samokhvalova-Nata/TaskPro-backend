import Joi from "joi";
import { priorityList, deadlineRegex } from "../constants/card-constants.js";


const cardAddSchema = Joi.object({
    title: Joi.string().required()
        .messages({
            "any.required": `missing required "title" field`,
        }),
    description: Joi.string(),
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


const cardTransportSchema = Joi.object({
    source: Joi.string().required()
        .messages({
            "any.required": `missing required "source" field`,
        }),
    destination: Joi.string().required()
        .messages({
            "any.required": `missing required "destination" field`,
        }),
})

export default {
    cardAddSchema,
    cardUpdateSchema,
    cardTransportSchema
};
