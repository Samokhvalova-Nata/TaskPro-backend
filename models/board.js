import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";

const boardSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Set title for board'],
    },
    background: {
        type: String,
        default: "",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    orderNumber: {
        type: Number,
    },
}, { versionKey: false, timestamps: true });

boardSchema.pre("findOneAndUpdate", validateAtUpdate);
boardSchema.post("save", handleSaveError);
boardSchema.post("findOneAndUpdate", handleSaveError);

const Board = model("board", boardSchema);

export default Board;