import React, { useEffect, useState } from 'react'
import { Link, NavLink, useFetcher } from 'react-router-dom';
import {Input} from "@nextui-org/react";
import { FaShoppingCart } from "react-icons/fa";
import { useCookies } from 'react-cookie';
import UserAvatar from './UserAvatar';

function Navbar() {
  const [cookies]= useCookies()
  const [isAuth , setIsAuth]= useState(false)

  useEffect(()=>{
    if (cookies.userData){
      setIsAuth(true)
    }
  },[cookies?.userData , isAuth])

  return (
  <header className="flex items-center justify-between h-16 px-4 md:px-6  bg-gray-950 dark:bg-gray-950 shadow font-roboto">
    <Link className="text-lg font-bold text-white" to="/">
      Shipper
    </Link>
    {/*<Input className='m-10 max-w-xl' size='sm' />*/}
    <div className='flex '>
    <Link to='/cart' className='m-5'>
    <FaShoppingCart size={23} color='white' />
    </Link>
    {isAuth ? (
      <div>
        <UserAvatar/>
      </div>
    ) :(
      <button color="primary" variant="ghost" size="lg">
      <NavLink
        to="/signup"
        style={({ isActive }) => {return isActive ? { color: 'black' } : {};}}
        className="text-white font-bold"
      >
        Login
      </NavLink>
    </button>
    )}
    </div>
  </header>
  )
}

export default Navbar
