import React, { useEffect } from 'react'
import "./app.css"
import axios from "axios"
import { useState } from 'react'
function Login({ loginfunc }) {
  const [message, setmessage] = useState(null)
  const [data, setdata] = useState(
    {

      Email: "",
      Password: "",

    }
  )
  const hanldechange = (e) => {
    const { name, value } = e.target
    setdata({ ...data, [name]: value })
    console.log(name)
  }
  const handleclick = (e) => {
    e.preventDefault()
    const temp = {
      Email: data.Email,
      Password: data.Password,

    }
    axios.post("http://localhost:4000/login", temp)
      .then((response) => {
        if (response.data.login == true) {
          setmessage(response.data.msg)
          const token = response.data.tokken;
          const userid = response.data.userid;
          localStorage.setItem("jwt", token)
          localStorage.setItem("id", userid)
          loginfunc()
        } else {
          setmessage(response.data.msg)

        }


      })
      .catch((error) => console.log(error))
  }
  return (
    <div>
      <form className='Register-container'>
        <h1>{message}</h1>
        <div className='inner-cont'>
          <div className='sub-cont'>
            <label>Email</label>
            <input type='email' value={data.Email} name='Email' placeholder='enter your email ' onChange={hanldechange} required />
          </div>
          <div className='sub-cont'>
            <label>Password</label>
            <input type='text' name='Password' value={data.Password} placeholder='enter your password ' onChange={hanldechange} required />
          </div>
          <div className='sub-cont'>
            <input type='submit' value={"submit"} className='button' onClick={handleclick} />
          </div>
        </div>
      </form>
    </div>
  )
}
export default Login
