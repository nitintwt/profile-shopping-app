import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useCookies } from 'react-cookie';
import { toast, Toaster } from 'sonner';
import ProductCardSkeleton from './ProductCardSkeleton';

function AllProducts() {
  const [products , setProducts]= useState([])
  const [cookies] = useCookies();
  const [loading , setLoading]= useState(false)

  useEffect(()=>{
    setLoading(true)
    const fetchAllProducts = async ()=>{
      try {
        const productsData = await axios.get("/api/v1/users/products")
        setProducts(productsData?.data?.data)
        setLoading(false)
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
      toast.success("Added to cart successfully")
      const productsData = await axios.get("/api/v1/users/products");
      setProducts(productsData?.data?.data);
    } catch (error) {
      toast.warning("Something went wrong. Try again")
      console.log("Something went wrong while adding product in cart" , error)
    }
  }
  return (
    <div>
      <div className='flex flex-wrap gap-10 justify-center items-center'>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                imageLink={product.imageLink}
                name={product?.name}
                price={product?.price}
                handleAddToCart={() => handleAddToCart(product._id)}
              />
            ))
          ) : (
            <div>No products found</div>
          )
        )}
      </div>
      <Toaster position='bottom-center' />
    </div>
  )
}

export default AllProducts
