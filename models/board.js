import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";

const boardSchema = new Schema({


}, { versionKey: false, timestamps: true });

boardSchema.pre("findOneAndUpdate", validateAtUpdate);
boardSchema.post("save", handleSaveError);
boardSchema.post("findOneAndUpdate", handleSaveError);

const Board = model("board", boardSchema);

export default Board;