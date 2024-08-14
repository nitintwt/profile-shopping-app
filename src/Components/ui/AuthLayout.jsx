import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function AuthLayout({children}) {
  const navigate = useNavigate()
  const [loader , setLoader]= useState(true)
  const [cookies]= useCookies()

  useEffect(()=>{
    if(!cookies.userData){
      navigate("/signup")
    }
    setLoader(false)
  },[cookies])
  
  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout
