import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './app.css';
function Getpost() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { id } = useParams();
  console.log(id);
  function handle() {
    axios.get(`http://localhost:4000/getuserpost/${id}`)
      .then((response) => {
        setData(response.data.userdata);
        setToggle(true);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    handle();
  }, [id]);
  console.log(data);
  const handleDelete = (e, postid) => {
    e.preventDefault();
    console.log("id to delete", postid);
    axios.delete(`http://localhost:4000/deletpost/${postid}`)
      .then((response) => {
        console.log(response.data.msg);
        handle();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className='top-post-container'>
      <div className='post-container'>
        {
          toggle ? (
            data && data.map((item, key) => (
              <div className='post-conatiner-child post-conatiner-child1' key={key}>
                <div className='sub-post-container-child' style={{ color: 'red', textDecoration: 'underline' }}>
                  {item.title}
                </div>
                <div className='sub-post-container-child' style={{ color: 'black' }}>
                  <i className="fa-solid fa-arrows-up-down-left-right" style={{ color: 'orange' }}></i>    {item.content}
                </div>
                <div className='like-comment'>
                  <Link state={{ postid: item._id }} to={`/getpost/${id}/edit`} >
                    <button style={{ color: 'orange', borderRadius: '10px', height: '30px', width: '100px' }}>EDIT</button>
                  </Link>
                  
                  <button style={{ color: 'orange', borderRadius: '10px', height: '30px', width: '100px' }} onClick={(e) => handleDelete(e, item._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <h1>empty data </h1>
          )
        }
      </div>
    </div>
  );
}

export default Getpost;
