import React from 'react'
import ProductCard from '../Components/Products/ProductCard'
import AllProducts from '../Components/Products/AllProducts'
import dotenv from 'dotenv'


function Products() {

  return (
    <div className='bg-gray-950 w-full h-full'>
      <div className='p-10 flex justify-center items-center'>
        <AllProducts/>
      </div>
    </div>
  )
}

export default Products
