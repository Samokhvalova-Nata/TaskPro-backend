import { Schema, model } from "mongoose";

import {emailRegexp} from "../constants/user-constants.js";

import { handleSaveError, validateAtUpdate } from "./hooks.js";

const userSchema = new Schema({
    avatarURL: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    token: {
        type: String
    },

}, { versionKey: false, timestamps: true });

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;