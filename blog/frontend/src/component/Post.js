import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function Post() {
  const id = localStorage.getItem("id")
  console.log(id)
  const [message, setmessage] = useState()
  const [data, setdata] = useState(
    {

      title: "",
      content: "",

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
      title: data.title,
      content: data.content,
      userid: id
    }
    axios.post("http://localhost:4000/posting", temp)
      .then((response) => {
        console.log(response.data)
        setmessage(response.data.msg)
      })

  }
  return (
    <div >
      <div>
        <form className='Register-container'>
          <h1>{message}</h1>
          <div className='inner-cont'>

            <div className='sub-cont'>
              <label>Title</label>
              <input type='email' value={data.title} name='title' placeholder='enter your title ' onChange={hanldechange} required/>
            </div>
            <div className='sub-cont'>
              <label>Content</label>
              <input type='text' name='content' value={data.content} placeholder='enter your content ' onChange={hanldechange}   required/>
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

export default Post
