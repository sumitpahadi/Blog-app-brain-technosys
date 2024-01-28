import Userpost from "../model/Post";
import { Request, Response } from "express";
import User from "../model/User";
import user from "../model/User";
const posting = async (request: Request, response: Response): Promise<Response> => {
    try {
        interface postinfo {
            title: string,
            content: string,
            userid: string,


        }
        const { title, content, userid }: postinfo = request.body;
        const requiredfield = ["title", "content"]

        const missingFields = requiredfield.filter(field => !request.body[field]);
        if (missingFields.length > 0) {

            return response.status(200).json({ msg: `fields missing: ${missingFields.join(', ')}` });
        }
        else {


            console.log(title, content, userid)
            if (!userid) {
                return response.status(200).json(
                    {
                        msg: "please login first"
                    }
                )

            }
            const data = await Userpost.create({
                title: title,
                content: content,
                userid: userid
            })
            return response.status(200).json(
                {
                    userdata: data,
                    msg: "post is posted"
                }
            )

        }
    } catch (error) {
        return response.status(500).json(
            {
                msg: error
            }
        )

    }
}
const getpost = async (request: Request, response: Response): Promise<Response> => {
    try {
        const data = await Userpost.find({})
        return response.status(200).json(
            {
                data: data
            }
        )

    } catch (error) {
        return response.status(500).json(
            {
                msg: error
            }
        )

    }
}
const getuserpost = async (request: Request, response: Response): Promise<Response> => {
    try {
        const userid = request.params.id;
        console.log(userid)
        if (userid) {
            const findinduser = await Userpost.find({ userid })
            console.log(findinduser)
            if (findinduser) {
                return response.status(200).json(
                    {
                        msg: "get user",
                        userdata: findinduser,
                        // postid:post_id

                    }
                )

            }
            else {
                return response.status(200).json(
                    {
                        msg: "no post"
                    }
                )
            }

        }
        else {
            return response.status(200).json(
                {
                    msg: "id not found"
                }
            )
        }


    } catch (error) {
        return response.status(500).json(
            {
                msg: error
            }
        )

    }

}

const updatepost = async (request: Request, response: Response): Promise<Response> => {
    try {
        const userid = request.params.id;
        // const postid = mongoose.Types.ObjectId(request.params.postid);
        const postid = request.params.postid.trim();
        console.log(userid, postid)
        interface updateinfo {
            title: string,
            content: string

        }
        const { title, content }: updateinfo = request.body
        const requiredfield = ["title", "content"]

        const missingFields = requiredfield.filter(field => !request.body[field]);
        if (missingFields.length > 0) {

            return response.status(200).json({ msg: `fields missing: ${missingFields.join(', ')}` });
        }
        else {


            if (title && content) {
                const update = await Userpost.updateOne(

                    { userid: userid, _id: postid },
                    { $set: { title: title, content: content } }


                )
                return response.status(200).json(
                    {
                        msg: "user post is updated",
                    }
                )

            }
            else {
                return response.status(200).json(
                    {
                        msg: "field is empty"
                    }
                )
            }
        }
    } catch (error) {
        console.log(error)
        return response.status(500).json(
            {
                msg: error
            }
        )
    }

}

const deletepost = async (request: Request, response: Response): Promise<Response> => {
    try {
        const postid = request.params.postid;
        console.log(postid)
        const postdelete = await Userpost.deleteOne({
            _id: postid
        })
        return response.status(200).json(
            {
                msg: "post is delete",
                message1: postdelete
            }
        )
    } catch (error) {
        return response.status(500).json(
            {
                msg: error
            }
        )
    }

}
const errorpage = async (request: Request, response: Response): Promise<Response> => {
    return response.status(404).json(
        {
            msg: "page not found"
        }
    )
}


const Like = async (request: Request, response: Response): Promise<Response> => {
    try {
        interface LikePost {
            like: number;
        }
        const postid = request.params.postid;
        const { like }: LikePost = request.body;
        console.log(like)
        console.log(postid, "post and like")
        if (typeof like !== 'number' || like < 0) {
            return response.status(400).json({ error: 'Invalid value for "like"' });
        }
        const likeblog = await Userpost.updateOne(
            {
                _id: postid,
            },
            {
                $inc: { like: like },
            }
        );
        return response.status(200).json({
            success: true,
            message: 'Post liked',
            data: likeblog,
        });

    } catch (error) {
        return response.status(500).json({
            error: 'Internal Server Error',
            message: error,
        });
    }
};



// const Like = async (request: Request, response: Response): Promise<Response> => {
//     try {
//         const postid = request.params.postid;
//         const userid = request.params.userid;
//         const like: number = 1;

//         console.log("post id ", postid, "userid ", userid, "like", like);

//         if (typeof like !== 'number' || like < 0) {
//             return response.status(400).json({ error: 'Invalid value for "like"' });
//         }

//         // Check if the post exists
//         const findingpost = await Userpost.findById(postid);
//         if (!findingpost) {
//             return response.status(404).json({ error: 'Post not found' });
//         }

//         // Check if the user exists
//         const findinguser = await Userpost.findOne({ userid: userid });
//         if (!findinguser) {
//             return response.status(404).json({ error: 'User not found' });
//         }

//         // Update the post with the new like
//         const likeblog = await Userpost.findOneAndUpdate(
//             { _id: postid },
//             {
//                 $push: {
//                     like: {
//                         user_id: userid,
//                         post_id: postid,
//                         like: like,
//                     },
//                 },
//             },
//             { new: true } // This option returns the updated document
//         );

//         console.log("likeblog", likeblog);

//         return response.status(200).json({
//             success: true,
//             message: 'Post liked',
//             data: likeblog,
//         });

//     } catch (error) {
//         return response.status(500).json({
//             error: 'Internal Server Error',
//             message: error,
//         });
//     }
// };



const dislike = async (request: Request, response: Response): Promise<Response> => {
    try {
        interface dislikepost {
            dislike: number,
        }
        const postid = request.params.postid;
        const { dislike }: dislikepost = request.body;
        const dislikeblog = await Userpost.updateOne
            (
                {
                    _id: postid,

                },
                {
                    $inc: { dislike: dislike }

                }
            )
        return response.status(200).json(
            {
                msg: "post dislike",
                data: dislikeblog

            }
        )




    } catch (error) {
        return response.status(500).json(
            {
                msg: error
            }
        )

    }

}
const commentpost = async (request: Request, response: Response): Promise<Response> => {
    interface commentpost {
        comment: string
    }
    try {
        const { comment }: commentpost = request.body;
        const postid = request.params.postid;
        const userid = request.params.userid;
        console.log("user id is " + userid);
        console.log("post id is " + postid);
        if (userid=="null" || postid=='null') {
            return response.status(200).json({
                msg: "Please login first to comment on post"
            });
        } else {
            const Postcomment = await Userpost.updateOne(
                { _id: postid },
                {
                    $push: {
                        comment: {
                            comment: comment,
                            user_commentid: userid,
                            timestamp: new Date(),
                        },
                    },
                }
            );

            return response.status(200).json({
                msg: "Comment is posted",
                data: Postcomment,
                
            });
        }
    } catch (error) {
        return response.status(500).json({
            msg: error
        });
    }
}


const userinformation = async (request: Request, response: Response): Promise<Response> => {
    try {
        const userid = request.params.userid
        if (userid) {
            console.log("user is is", userid)
            const finding_user = await User.findOne({ _id: userid })
            console.log("user info", finding_user)
            return response.status(200).json(
                {
                    msg: "user is get",
                    data: finding_user
                }
            )
        }
        else {
            return response.status(200).json(
                {
                    msg: "user not exist"
                }
            )
        }

    } catch (error) {
        return response.status(500).json(
            {
                msg: error
            }
        )
    }
}
export default { posting, getpost, updatepost, deletepost, getuserpost, errorpage, Like, dislike, commentpost, userinformation }