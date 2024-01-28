import React from 'react'
import "./app.css"
import axios from "axios"
import { useState } from 'react'
function Register() {
  const [message,setmessage]=useState(null)
  const [data ,setdata]=useState(
    {
      FirstName:"",
      LastName:"",
      Email:"",
      Password:"",
      Confirmpassword:"",
      DOB:""
    }
  )
   const hanldechange=(e)=>{
    const {name,value}=e.target
    setdata({...data,[name]:value})
    console.log(name)
   }
   const handleclick=(e)=>{
    e.preventDefault()
    const temp={
      FirstName:data.FirstName,
      LastName:data.LastName,
      Email:data.Email,
      Password:data.Password,
      Confirmpassword:data.Confirmpassword,
      DOB:data.DOB
      
    }
    axios.post("http://localhost:4000/register",temp)
    .then((response)=>{
      console.log(response.data)
      setmessage(response.data.msg)
    })
    .catch((error)=>console.log(error))

   }

  return (
    <div>
    <form className='Register-container'>
      <h1>{message}</h1>
            <div className='inner-cont'>
            <div  className='sub-cont'>
            <label>FirstName</label>
            <input type='text' name='FirstName'   value={data.FirstName} placeholder='enter your  first name' onChange={hanldechange}/>
            </div>
            <div className='sub-cont'>
            <label>LastName</label>
            <input type='text' name='LastName'   value={data.LastName} placeholder='enter your last name' onChange={hanldechange}/>
            </div>
            <div className='sub-cont'>
            <label>Email</label>
            <input type='email' value={data.Email}   name='Email' placeholder='enter your email ' onChange={hanldechange}/>
            </div>
            <div className='sub-cont'>
            <label>Password</label>
            <input type='text' name='Password'   value={data.Password} placeholder='enter your password ' onChange={hanldechange}/>
            </div>
            <div className='sub-cont'>
            <label>Confirmpassword</label>
            <input type='text' name='Confirmpassword'   value={data.Confirmpassword} placeholder='enter your password ' onChange={hanldechange}/>
            </div>
            <div className='sub-cont'>
            <label>DOB</label>
            <input type='date' name='DOB' placeholder='enter your DOB '   value={data.DOB} onChange={hanldechange}/>
            </div>
            <div className='sub-cont'>
              <input type='submit' value={"submit"} className='button' onClick={handleclick}/>
            </div>
            </div>
        </form>
    </div>
  )
}

export default Register
