import Joi from "joi";
import { backgroundList, iconList } from "../constants/board-constants.js";

const boardAddSchema = Joi.object({
    title: Joi.string().required()
        .messages({
            "any.required": `missing required "title" field`,
        }),
    icon: Joi.string().valid(...iconList),
    background: Joi.string().valid(...backgroundList),
});

const boardUpdateSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string().valid(...iconList),
  background: Joi.string().valid(...backgroundList),
});


export default {
  boardAddSchema,
  boardUpdateSchema,
};
