"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postcontroller_1 = __importDefault(require("../controller/postcontroller"));
const usercontroller_1 = __importDefault(require("../controller/usercontroller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const routes = (0, express_1.Router)();
routes.post("/register", usercontroller_1.default.register);
routes.post("/login", usercontroller_1.default.login);
routes.get("/home", auth_1.default, usercontroller_1.default.home);
routes.post("/posting", postcontroller_1.default.posting);
routes.get("/getpost", postcontroller_1.default.getpost);
//applly middle ware on these three routes updatepost deletepost getuserpost
routes.put("/updatepost/:id/:postid", postcontroller_1.default.updatepost);
routes.delete("/deletpost/:postid", postcontroller_1.default.deletepost);
routes.get("/getuserpost/:id", postcontroller_1.default.getuserpost);
routes.get("*", postcontroller_1.default.errorpage);
exports.default = routes;
