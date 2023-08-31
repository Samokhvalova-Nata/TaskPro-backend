import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";
import { iconList, backgroundList } from "../constants/board-constants.js";


const boardSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Set title for board'],
    },
    icon: {
        type: String,
        enum: iconList,
        default: "project",
    },
    background: {
        type: String,
        default: "no-background",
        enum: backgroundList,
    },
    backgroundURL: {
        type: Object,
        default: {},
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Set owner for board'],
    },
    orderNumber: {
        type: Number,
    },
}, { versionKey: false, timestamps: true, minimize: false });

boardSchema.pre("findOneAndUpdate", validateAtUpdate);
boardSchema.post("save", handleSaveError);
boardSchema.post("findOneAndUpdate", handleSaveError);

const Board = model("board", boardSchema);

export default Board; 