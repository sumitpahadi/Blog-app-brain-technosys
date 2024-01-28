import React from 'react'
import "./app.css"
import axios from 'axios'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
function Edit() {
    const {id}=useParams()
    const [message,setmessage]=useState()
    const postid=useLocation().state.postid
    console.log(postid)

    console.log("id",id)
    const [data, setdata1] = useState(
        {
    
          title: "",
          content: "",
    
        }
      )
  const handleclick = (e) => {
    e.preventDefault()
    const temp = {
      title: data.title,
      content: data.content,

    }
    axios.put(`http://localhost:4000/updatepost/${id}/${postid}`, temp)
      .then((response) => {
        console.log(response.data)
        setmessage(response.data.msg)
      
      })

  }
    const hanldechange = (e) => {
        const { name, value } = e.target
        setdata1({ ...data, [name]: value })
        console.log(name)
      }
  return (
    <div>
        <div className='center-container'>
          <form className='Register-container Register-container1'>
            <h2 style={{marginTop:"50px"}}>{message}</h2>
            <div className='inner-cont'>
              {/* <p className='point'> <button onClick={handletogle>*</button></p> */}

              <div className='sub-cont'>
                <label>Title</label>
                <input type='email' value={data.title} name='title' placeholder='enter your title ' onChange={hanldechange} />
              </div>
              <div className='sub-cont'>
                <label>Content</label>
                <input type='text' name='content' value={data.content} placeholder='enter your content ' onChange={hanldechange} />
              </div>

              <div className='sub-cont'>
                <input type='submit' value={"submit"} className='button' onClick={handleclick} />
              </div>
            </div>
          </form>
        </div>
      
    </div>
  )
}

export default Edit
