"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const containsFiveNumbers = (email.match(/\d/g) || []).length >= 3;
    return emailRegex.test(email) && containsFiveNumbers;
};
const Userschema = new mongoose_1.default.Schema({
    FirstName: {
        type: String,
        required: true,
        minlength: [3, "firstname length should be at least 3"],
        maxlength: [12, "firstname length should be less than or equal to 12"]
    },
    LastName: {
        type: String,
        required: true,
        minlength: [3, "lastname length should be at least 3"],
        maxlength: [12, "lastname length should be less than or equal to 12"]
    },
    Email: {
        unique: true,
        lowercase: true,
        type: String,
        maxlength: [30, "Email length should be less than or equal to 30"],
        required: true,
        validate: {
            validator: emailValidator,
            message: 'Invalid email format',
        },
    },
    Password: {
        type: String,
        required: true,
    },
    DOB: {
        type: String,
        required: true,
    }
});
const user = mongoose_1.default.model("User", Userschema);
exports.default = user;
