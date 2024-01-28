import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Post from './Post';
import Getpost from './Getpost';
import Edit from './Edit';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';
import User_profile from './User_profile';
function Routing() {
  const token = localStorage.getItem('jwt');
  const storedId = localStorage.getItem('id');
  console.log("token and id is ", token, storedId)

  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      setUser({ token, storedId })
    }
  }, [user?.token])


  const login = () => {
    setUser({ token, storedId });
  }

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('id');
    setUser({});
  };

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login loginfunc={login} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/post"
          element={
            <ProtectedRoute user={user}>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route
          path="/getpost/:id"
          element={
            <ProtectedRoute user={user}>
              <Getpost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/getpost/:id/edit"
          element={
            <ProtectedRoute user={user}>
              <Edit />
            </ProtectedRoute>
          }
        />
           <Route path='/userinfo/:userid' element={<User_profile/>} />

      </Routes>
    </div>
  );
}

export default Routing;


export const ProtectedRoute = ({ user, children }) => {

  if (user) {
    return children
  }
  else {
    return <Navigate to={'/'} />
  }
}
