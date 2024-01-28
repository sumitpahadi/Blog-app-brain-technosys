"use strict";
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
const Post_1 = __importDefault(require("../model/Post"));
const posting = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userid } = request.body;
        const requiredfield = ["title", "content"];
        const missingFields = requiredfield.filter(field => !request.body[field]);
        if (missingFields.length > 0) {
            return response.status(400).json({ msg: `fields missing: ${missingFields.join(', ')}` });
        }
        else {
            console.log(title, content, userid);
            if (!userid) {
                return response.status(200).json({
                    msg: "please login first"
                });
            }
            const data = yield Post_1.default.create({
                title: title,
                content: content,
                userid: userid
            });
            return response.status(200).json({
                userdata: data,
                msg: "post is posted"
            });
        }
    }
    catch (error) {
        return response.status(500).json({
            msg: error
        });
    }
});
const getpost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Post_1.default.find({});
        return response.status(200).json({
            data: data
        });
    }
    catch (error) {
        return response.status(500).json({
            msg: error
        });
    }
});
const getuserpost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = request.params.id;
        console.log(userid);
        if (userid) {
            const findinduser = yield Post_1.default.find({ userid });
            console.log(findinduser);
            if (findinduser) {
                return response.status(200).json({
                    msg: "get user",
                    userdata: findinduser,
                    // postid:post_id
                });
            }
            else {
                return response.status(200).json({
                    msg: "no post"
                });
            }
        }
        else {
            return response.status(200).json({
                msg: "id not found"
            });
        }
    }
    catch (error) {
        return response.status(500).json({
            msg: error
        });
    }
});
const updatepost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = request.params.id;
        // const postid = mongoose.Types.ObjectId(request.params.postid);
        const postid = request.params.postid.trim();
        console.log(userid, postid);
        const { title, content } = request.body;
        const requiredfield = ["title", "content"];
        const missingFields = requiredfield.filter(field => !request.body[field]);
        if (missingFields.length > 0) {
            return response.status(400).json({ msg: `fields missing: ${missingFields.join(', ')}` });
        }
        else {
            if (title && content) {
                const update = yield Post_1.default.updateOne({ userid: userid, _id: postid }, { $set: { title: title, content: content } });
                return response.status(200).json({
                    msg: "user post is updated",
                });
            }
            else {
                return response.status(200).json({
                    msg: "field is empty"
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            msg: error
        });
    }
});
const deletepost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postid = request.params.postid;
        console.log(postid);
        const postdelete = yield Post_1.default.deleteOne({
            _id: postid
        });
        return response.status(200).json({
            msg: "post is delete",
            message1: postdelete
        });
    }
    catch (error) {
        return response.status(500).json({
            msg: error
        });
    }
});
const errorpage = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(404).json({
        msg: "page not found"
    });
});
exports.default = { posting, getpost, updatepost, deletepost, getuserpost, errorpage };
