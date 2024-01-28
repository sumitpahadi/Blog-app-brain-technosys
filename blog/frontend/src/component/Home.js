import React, { useEffect, useState } from 'react'
import axios from "axios"
import Allpost from './Allpost'
function Home() {
  const token = localStorage.getItem("jwt")
  const [data, setata] = useState()
  const [verified, setverifed] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:4000/home",
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data)
        setata(response.data.msg)
        setverifed(true)
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <div>
      {verified ? <h1 style={{textAlign:'center'}}>{data}You can post a Blog </h1> :
        <h1 style={{textAlign:'center'}} >Login to add post</h1>
      }
      <Allpost/>
    </div>
  )
}

export default Home
