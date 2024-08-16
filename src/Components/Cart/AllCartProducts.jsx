import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { toast, Toaster } from 'sonner';
import CartProductCard from './CartProductCard';
import { RiH1 } from 'react-icons/ri';

function AllCartProducts() {
  const [products , setProducts]= useState([])
  const [cookies] = useCookies();


  const handleDeleteFromCart = async (productId)=>{
    try {
     const deleteProduct = await axios.delete(`/api/v1/users/deleteProductFromCart?productId=${productId}&userId=${cookies?.userData?._id}`)
     toast.success("Product deleted from cart") 
    } catch (error) {
      console.log("Something went wrong while deleting product from cart", error)
      toast.error("Something went wrong. Try again")
    }
  }

  useEffect(()=>{
    const fetchAllCartProducts = async ()=>{
      try {
        const productsData = await axios.get(`/api/v1/users/cartProducts?userId=${cookies?.userData?._id}`)
        console.log(productsData)
        setProducts(productsData?.data?.data)
      } catch (error) {
        console.log("Something went wrong while fetching")
      }
    }
    fetchAllCartProducts()
  },[])


  return (
    <div className=''>
      {products.length >0 ? (
        products.map((product)=> <CartProductCard key={product} productId={product} handleDelete={()=> handleDeleteFromCart(product)}/>)
      ):(
        <h1>No products</h1>
      )}
    </div>
  )
}

export default AllCartProducts
