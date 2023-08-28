import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";
import { priorityList, deadlineRegex } from "../constants/card-constants.js";

const cardSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Set title for card'],
    },
    description: {
        type: String,
        required: [true, 'Set description for card'],
    },
    priority: {
        type: String,
        enum: priorityList,
        default: "without priority",
    },
    deadline: {
        type: String,
        match: deadlineRegex,
    },
    column: {
        type: Schema.Types.ObjectId,
        ref: 'column',
    },
    orderNumber: {
        type: Number,
    },
}, { versionKey: false, timestamps: true });

cardSchema.pre("findOneAndUpdate", validateAtUpdate);
cardSchema.post("save", handleSaveError);
cardSchema.post("findOneAndUpdate", handleSaveError);

const Card = model("board", cardSchema);

export default Card;