import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './app.css';
import { Link } from 'react-router-dom';

function Allpost() {
    
    const [comments, setComments] = useState({
        comment: ""
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get('http://localhost:4000/getpost')
            .then((response) => {
                console.log('hi');
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLikes = (postid) => {
        console.log(postid);
        const like = {
            like: 1,
        };

        axios
            .put(`http://localhost:4000/like/${postid}`, like)
            .then((response) => {
                console.log(response.data.message);
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const id = localStorage.getItem("id")
    const handleComment = (postid) => {
        const postComment = comments[postid];

        if (!postComment || !postComment.comment) {
            alert("Please fill the input");
            return;
        }



        const temp = {
            comment: postComment.comment
        };

        axios
            .put(`http://localhost:4000/comment/${postid}/${id}`, temp)
            .then((response) => {
                console.log("hkadjuh")
            
                alert(response.data.msg);
                fetchData();
                setComments("")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (e, postid) => {
        const { value } = e.target;
        setComments((prevComments) => ({
            ...prevComments,
            [postid]: {
                ...prevComments[postid],
                comment: value,
            },
        }));

    };
    console.log("comment data", data)
    return (
        <div>
            <div className='post-container'>
                {data &&
                    data.map((item, key) => {
                        return (
                            <div className='post-conatiner-child' key={key}>
                                <div className='sub-post-container-child' style={{ color: 'red', textDecoration: 'underline' }}>
                                    {item.title}
                                </div>
                                <div className='sub-post-container-child' style={{ color: 'black' }}>
                                    <i className='fa-solid fa-arrows-up-down-left-right' style={{ color: 'orange' }}></i> {item.content}
                                </div>
                                <div className='like-comment'>
                                    <i className='fa-regular fa-thumbs-up' style={{ height: '15px' }} onClick={() => handleLikes(item._id)}>
                                        <p style={{ color: 'black', fontSize: '15px' }}>{item.like}</p>
                                    </i>
                                    <i className='fa-regular fa-thumbs-down' style={{ height: '15px' }}>
                                        <p style={{ color: 'black', fontSize: '15px' }}>{item.dislike}</p>
                                    </i>
                                    <input
                                        type='text'
                                        value={comments[item._id]?.comment || ''}
                                        onChange={(e) => handleInputChange(e, item._id)}
                                    />
                                    <button
                                        style={{ color: 'orange', borderRadius: '10px', height: '30px', width: '100px' }}
                                        onClick={() => handleComment(item._id)}>
                                        Comment
                                    </button>
                                </div>
                                <div className='display-comment'>
                                    <h4 style={{ color: "purple", fontSize: "14px" }}>
                                        {
                                            item.comment.map((item, index) => {
                                                return <p key={index}>
                                                    <i className="fa-solid fa-user" style={{ fontSize: "10px" }}></i> {item.comment}<Link style={{ color: "red" }} to={`/userinfo/${item.user_commentid}`}>     click</Link>
                                                </p>
                                            })
                                        }
                                    </h4>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Allpost;
