import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { toast, Toaster } from 'sonner';
import CartProductCard from './CartProductCard';
import CartProductSkeleton from './CartProductSkeleton';


function AllCartProducts() {
  const [products , setProducts]= useState([])
  const [cookies] = useCookies();
  const [loading , setLoading]= useState(false)

  const handleDeleteFromCart = async (productId)=>{
    try {
     const deleteProduct = await axios.delete(`${import.meta.env.VITE_AWS_API}/api/v1/users/deleteProductFromCart?productId=${productId}&userId=${cookies?.userData?._id}`, {withCredentials: true})
     toast.success("Product deleted from cart") 
    } catch (error) {
      console.log("Something went wrong while deleting product from cart", error)
      toast.error("Something went wrong. Try again")
    }
  }

  useEffect(()=>{
    setLoading(true)
    const fetchAllCartProducts = async ()=>{
      try {
        const productsData = await axios.get(`${import.meta.env.VITE_AWS_API}/api/v1/users/cartProducts?userId=${cookies?.userData?._id}`, {withCredentials: true })
        setProducts(productsData?.data?.data)
        setLoading(false)
      } catch (error) {
        console.log("Something went wrong while fetching")
      }
    }
    fetchAllCartProducts()
  },[])

  return (
    <div className=''>
      {loading ? (
         <CartProductSkeleton/>
      ):(
        products?.length >0 ? (
          products?.map((product)=> (
          <CartProductCard 
          key={product} 
          productId={product} 
          handleDelete={()=> handleDeleteFromCart(product)}/>))
        ):(
          <h1>No products</h1>
        )
      )}
      <Toaster position="bottom-center" />
    </div>
  )
}

export default AllCartProducts
