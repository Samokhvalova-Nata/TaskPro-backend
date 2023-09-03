import {Schema, model} from "mongoose";

import {emailRegexp, themeList} from "../constants/user-constants.js";

import {handleSaveError, validateAtUpdate} from "./hooks.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    avatarURL: {
        type: String,
        default: "",
    },
    userTheme: {
        type: String,
        enum: themeList,
        default: "light",
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },

}, {versionKey: false, timestamps: true});

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveError);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;