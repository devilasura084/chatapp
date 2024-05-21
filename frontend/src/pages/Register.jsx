import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import react from "../assets/react.svg"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
function Register() {
    const navigate=useNavigate()
    const toastOptions={
                position:"bottom-right",
                autoClose:8000,
                pauseOnHover:true,
                draggable:true,
            }
    const handleSubmit=async(e)=>{
        e.preventDefault();
      if( handleValidation())
      {
        const{username,email,password}=values;
        const{data}=await axios.post(registerRoute,{
            username,
            email,
            password
        });
        if(data.status===false)
        {
            toast.error(data.msg,toastOptions)
        }
        if(data.status===true)
        {
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        }
       navigate("/");
      }
    }
    const[values,setvalues]=useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
    })
    const handleChange=(e)=>{
        setvalues({...values,[e.target.name]:e.target.value})
    }
    const handleValidation=()=>{
        const{username,email,password,confirmpassword}=values;
        if(password.length<8)
        {
            toast.error("password must have eight letters atleast",toastOptions);
            return false;
        }
        if(password!==confirmpassword)
        {
            toast.error("confirmpassword does not match",toastOptions);
            return false;
        }
        if(username.length<3)
        {
            toast.error("username must be atteast three characters",toastOptions);
            return false;
        }
        if(email==="")
        {
            toast.error("Need a email",toastOptions);
            return false;
        }
        return true;
    }
  return (
    <>
   <div className='formcontainer'>
    <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <div className='brand'>
            <img src={react} alt="" />
        </div>
        <input type="text" placeholder='Username' name='username' onChange={(e)=>handleChange(e)}/>
        <input type="email" placeholder='Email' name='email' onChange={(e)=>handleChange(e)}/>
        <input type="password" placeholder='Password' name='password' onChange={(e)=>handleChange(e)}/>
        <input type="password" placeholder='Confirmpassword' name='confirmpassword' onChange={(e)=>handleChange(e)}/>
        <button type='submit'>Sign Up</button>
        <span>Already have an accout? <Link className='a' to="/login" >Login.</Link></span>
    </form>
   </div>
   <ToastContainer/>
   </>
  )
}

export default Register