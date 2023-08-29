import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";

const columnSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Set title for column'],
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'board',
    },
    orderNumber: {
        type: Number,
    },
}, { versionKey: false, timestamps: true });

columnSchema.pre("findOneAndUpdate", validateAtUpdate);
columnSchema.post("save", handleSaveError);
columnSchema.post("findOneAndUpdate", handleSaveError);

const Column = model("column", columnSchema);

export default Column;