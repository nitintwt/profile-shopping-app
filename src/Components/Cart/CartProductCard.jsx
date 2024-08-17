import {Button} from "@nextui-org/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { useCookies } from "react-cookie";

function CartProductCard({ productId , handleDelete }) {
  const [product , setProduct]= useState()
  const [cookies] = useCookies();
  const [productCount , setProductCount]= useState()

  useEffect(()=>{
    const fetchProductData = async ()=>{
      try {
        const productData = await axios.get(`/api/v1/users/productData?productId=${productId}`)
        setProduct(productData?.data?.data)
      } catch (error) {
        console.log("Something went wrong while fetching product data" , error)
      }
    }
    fetchProductData()
  },[productId])


  const handleIncreaseQuantity = async ()=>{
    try {
      const add = await axios.post("/api/v1/users/addToCart", {
        productId:productId,
        userId:cookies.userData._id
      })
      setProductCount(prevCount => prevCount + 1);
    } catch (error) {
      console.log("Something went wrong while adding product in cart" , error)
    }
  }

  const handleDecreaseQuantity  = async ()=>{
    try {
      const decrease = await axios.delete(`api/v1/users/decreaseProductQuantity?userId=${cookies?.userData._id}&productId=${productId}`)
      setProductCount(prevCount => Math.max(prevCount - 1, 1));
    } catch (error) {
      console.log("Something went wrong while decreasing product quantity" , error)
    }
  }

  useEffect(()=>{
    const fetchProductCount = async ()=>{
      try {
        const count = await axios.get(`/api/v1/users/productCount?userId=${cookies.userData._id}&productId=${productId}`)
        setProductCount(count?.data?.data)
      } catch (error) {
        console.log("Something went wrong while fetching product count" , error)
      }
    }
    fetchProductCount()
  },[productId])

  return (
    <div>
      <div key={productId} className=" flex items-center gap-4 p-10">
        <Image
        src={product?.imageLink}
        alt="Product Image"
        width={120}
        height={120}
        objectFit="cover"
        />
        <div className="grid gap-1 ">
          <h3 className="font-medium">{product?.name}</h3>
          <p className="text-muted-foreground">₹{product?.price}</p>
        </div>
        <div className="flex items-center gap-5">
          <Button onClick={ handleDecreaseQuantity} >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="font-medium">{productCount}</span>
          <Button onClick={handleIncreaseQuantity} >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
          <Button onClick={handleDelete} >
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Remove from cart</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
