import React, { useEffect } from 'react';
import './app.css';
import { Link } from 'react-router-dom';

function Navbar({ user, logout }) {
  console.log("user ", user)
  const id = localStorage.getItem('id');
  return (
    <div className='navbar' style={{ paddingTop: '10px' }}>
      <div><Link to={'/'}>Home</Link></div>
      <div><Link to={'/register'}>Register</Link></div>
      {user?.token && <div><Link to={'/post'}>Post a Blog</Link></div>}
      {user?.token && <div><Link to={`/getpost/${id}`}>User Post</Link></div>}
      {user.token ? (
        <div>
          <Link to={'/'} onClick={logout}>Logout</Link>
        </div>
      ) : (
        <div>
          <Link to={'/login'}>Login</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
