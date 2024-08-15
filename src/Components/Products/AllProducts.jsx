import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useCookies } from 'react-cookie';
import { toast, Toaster } from 'sonner';

function AllProducts() {
  const [products , setProducts]= useState([])
  const [cookies] = useCookies();

  useEffect(()=>{
    const fetchAllProducts = async ()=>{
      try {
        const productsData = await axios.get("/api/v1/users/products")
        setProducts(productsData?.data?.data)
      } catch (error) {
        console.log("Something went wrong while fetching")
      }
    }
    fetchAllProducts()
  },[])

  const handleAddToCart = async (productId)=>{
    try {
      const add = await axios.post("/api/v1/users/addToCart", {
        productId:productId,
        userId:cookies.userData._id
      })
      console.log("added to cart",add)
      toast.success("Added to cart successfully")
    } catch (error) {
      toast.error("Something went wrong. Try again")
      console.log("Something went wrong while adding product in cart" , error)
    }
  }
  return (
    <div>
      <div className='flex flex-wrap gap-10 justify-center items-center'>
        {products.map((product)=>{
          return <ProductCard key={product._id} productId={product._id} imageLink={product.imageLink} name={product?.name} price={product?.price} handleAddToCart={()=>handleAddToCart(product._id)}/>
        })}
      </div>
     <Toaster position='bottom-center'/>
    </div>
  )
}

export default AllProducts
