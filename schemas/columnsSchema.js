import Joi from "joi";

export const columnsSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "any.required": `missing required "title" field`,
        }),
    board: Joi.string()
        .messages({
            "any.required": `missing required "board" field`,
        }),

});
