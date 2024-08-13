import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {Input} from "@nextui-org/react";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
  <header className="flex items-center justify-between h-16 px-4 md:px-6  bg-gray-950 dark:bg-gray-950 shadow font-roboto">
    <Link className="text-lg font-bold text-white" to="/">
      Product
    </Link>
    {/*<Input className='m-10 max-w-xl' size='sm' />*/}
    <div className='flex '>
    <Link to='/cart' className='mr-10'>
    <FaShoppingCart size={21} color='white' />
    </Link>
    <button color="primary" variant="ghost" size="lg">
      <NavLink
        to="/signup"
        style={({ isActive }) => {return isActive ? { color: 'black' } : {};}}
        className="text-white font-bold"
      >
        Login
      </NavLink>
    </button>
    </div>
  </header>
  )
}

export default Navbar
