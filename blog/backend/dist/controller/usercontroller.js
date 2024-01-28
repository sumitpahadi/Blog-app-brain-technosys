"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const saltround = 10;
const secretkey = "sumitrawat";
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FirstName, LastName, Email, Password, Confirmpassword, DOB } = request.body;
        const requiredFields = ['FirstName', 'LastName', 'Email', 'Password', 'Confirmpassword', 'DOB'];
        console.log(requiredFields);
        const missingFields = requiredFields.filter(field => !request.body[field]);
        if (missingFields.length > 0) {
            return response.status(400).json({ msg: `fields missing: ${missingFields.join(', ')}` });
        }
        else {
            const Checking_email = yield User_1.default.findOne({ Email: Email });
            if (Checking_email) {
                return response.status(200).json({
                    msg: "user email is already register"
                });
            }
            if (Password === Confirmpassword) {
                const hashpassword = bcrypt_1.default.hashSync(Password, saltround);
                const userdata = yield User_1.default.create({
                    FirstName: FirstName,
                    LastName: LastName,
                    Email: Email,
                    Password: hashpassword,
                    DOB: DOB
                });
                return response.status(200).json({
                    msg: "user is register",
                    user: userdata
                });
            }
            else {
                return response.status(200).json({
                    msg: "password and Confirm passwordis not match"
                });
            }
        }
    }
    catch (error) {
        return response.status(500).json({
            msg: error
        });
    }
});
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = request.body;
        const requiredfield = ["Email", "Password"];
        const missingFields = requiredfield.filter(field => !request.body[field]);
        if (missingFields.length > 0) {
            return response.status(400).json({ msg: `fields missing: ${missingFields.join(', ')}` });
        }
        else {
            const check_emal = yield User_1.default.findOne({ Email: Email });
            if (!check_emal) {
                return response.status(200).json({
                    msg: "email id not exist"
                });
            }
            else {
                const compare = bcrypt_1.default.compareSync(Password, check_emal.Password);
                const id = check_emal._id;
                if (!compare) {
                    return response.status(200).json({
                        msg: "user password is not match"
                    });
                }
                else {
                    const token = jwt.sign({ Email: Email }, secretkey, {
                        expiresIn: "21 days",
                    });
                    return response.status(200).json({
                        msg: "user is login",
                        Email: Email,
                        Password: Password,
                        tokken: token,
                        userid: id,
                        login: true
                    });
                }
            }
        }
    }
    catch (error) {
        return response.status(500).json({
            msg: error
        });
    }
});
const home = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({
        msg: "welcome "
    });
});
exports.default = { register, login, home };
