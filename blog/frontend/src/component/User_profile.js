import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./app.css"
function User_profile() {
    const { userid } = useParams()
    const [userdata, setuserdata] = useState({})
    console.log("id is ", userid)
    useEffect(() => {
        axios.get("http://localhost:4000/user_info/" + userid)
            .then((response) => {
                console.log(response.data.data)
                setuserdata(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])
    console.log("user data is ", userdata)
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>User Information</h1>
            <div className='Profile-container'>

            <div className='userinfo'>
                <div className='user-name inner-userinfo'>
                    <p >FirstName :</p>
                    <p>{userdata.FirstName}</p>
                </div>
                <div className='last-name inner-userinfo'>
                    <p>LastName</p>
                    <p>{userdata.LastName}</p>

                </div>
                <div className='email inner-userinfo'>
                    <p>Email</p>
                    <p>{userdata.Email}</p>
                </div>
                <div className='DOB inner-userinfo'>
                    <p>Date of Birth</p>
                    <p>{userdata.DOB}</p>

                </div>

            </div>



            </div>
        </div>
    )
}

export default User_profile
