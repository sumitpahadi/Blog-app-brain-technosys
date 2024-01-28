// import mongoose, { Schema, Document, Model } from "mongoose";

// interface IComment {
//     user_commentid: Schema.Types.ObjectId,
//     comment: string;

//     timestamp: Date;
// }

// interface IPost extends Document {
//     title: string;
//     content: string;
//     userid: Schema.Types.ObjectId;
//     like: number;
//     dislike: number;
//     comment: IComment[];
// }

// const CommentSchema: Schema<IComment> = new mongoose.Schema<IComment>({
//     comment: { type: String, required: true },
//     user_commentid:{ type:String,required:true},
//     timestamp: { type: Date, default: Date.now }
// });

// const Postschema: Schema<IPost> = new mongoose.Schema<IPost>({
//     title: {
//         type: String,
//         required: true,
//         maxlength: 25,
//     },
//     content: {
//         type: String,
//         required: true,
//     },
//     userid: {
//         type: Schema.Types.ObjectId,
//         required: true,
//     },
//     like: {
//         type: Number,
//         default: 0
//     },
//     dislike: {
//         type: Number,
//         default: 0,
//     },
//     comment: {
//         type: [CommentSchema],
//         default: []
//     }
// });

// const userpost: Model<IPost> = mongoose.model<IPost>("Post", Postschema);
// export default userpost;






import mongoose, { Schema, Document, Model } from "mongoose";

interface IComment {
    user_commentid: Schema.Types.ObjectId;
    comment: string;
    timestamp: Date;
}

interface ILike {
    user_id: Schema.Types.ObjectId;
    post_id: Schema.Types.ObjectId;
    like: number;
}

const likeSchema: Schema<ILike> = new mongoose.Schema<ILike>({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    post_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    like: {
        type: Number,
        required: true
    }
});

const commentSchema: Schema<IComment> = new mongoose.Schema<IComment>({
    comment: { type: String, required: true },
    user_commentid: { type: Schema.Types.ObjectId, required: true },
    timestamp: { type: Date, default: Date.now }
});

interface IPost extends Document {
    title: string;
    content: string;
    userid: Schema.Types.ObjectId;
    like: ILike[];
    dislike: number;
    comment: IComment[];
}

const postSchema: Schema<IPost> = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: true,
        maxlength: 25,
    },
    content: {
        type: String,
        required: true,
    },
    userid: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    like: {
        type: [likeSchema],
        default: []
    },
    dislike: {
        type: Number,
        default: 0,
    },
    comment: {
        type: [commentSchema],
        default: []
    }
});

const userPost: Model<IPost> = mongoose.model<IPost>("Post", postSchema);
export default userPost;
