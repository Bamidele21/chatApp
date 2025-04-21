import React, { useEffect } from 'react';
import './App.css'
import Navbar from './components/navbar';
import { Routes,Route, Navigate } from 'react-router-dom';
import HomePage from './Routes/HomePage';
import SignupPage from './Routes/SignupPage';
import LoginPage from './Routes/LoginPage';
import SettingPage from './Routes/SettingPage';
import ProfilePage from './Routes/ProfilePage';
import instaAxios from './lib/axios';
import { useAuthStore } from './store/useAuthstore';
import {Toaster} from "react-hot-toast";
import Loading from './components/loading';
function App() {

  const {authUser, checkAuth, isCheckingAuth, onlineUsers} =useAuthStore()

  console.log ({onlineUsers})

  useEffect(()=> {
    checkAuth()
  }, [checkAuth]);
  console.log (authUser);

  if (isCheckingAuth && !authUser)
    return (
  <div>
    <Loading/>

  </div>)
  return(
  <>
  <Navbar />
  
  <Routes>
                <Route path="/" element={authUser? <HomePage/>: <Navigate to="/login"/>}/>
                <Route path="/signup" element={!authUser?<SignupPage/>:<Navigate to="/"/>}/>
                <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
                <Route path="/settings" element={<SettingPage/>}/>
                <Route path="/profile" element={authUser? <ProfilePage/>: <Navigate to="/login"/>}/>
            </Routes>
            <Toaster/>
  </>)
}

export default App
