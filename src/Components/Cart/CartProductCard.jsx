import {Button} from "@nextui-org/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addPrice, removePrice } from "../../Store/productSlice";

function CartProductCard({ productId , handleDelete }) {
  const [product , setProduct]= useState()
  const [cookies] = useCookies();
  const [productCount , setProductCount]= useState()
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchProductData = async ()=>{
      try {
        const productData = await axios.get(`${import.meta.env.VITE_AWS_API}/api/v1/users/productData?productId=${productId}`)
        setProduct(productData?.data?.data)
        const price = parseInt(productData?.data?.data?.price)
        dispatch(addPrice(price))
        dispatch
      } catch (error) {
        console.log("Something went wrong while fetching product data" , error)
      }
    }
    fetchProductData()
  },[productId])


  const handleIncreaseQuantity = async ()=>{
    try {
      const add = await axios.post(`${import.meta.env.VITE_AWS_API}}/api/v1/users/addToCart`, {
        productId:productId,
        userId:cookies.userData._id
      })
      setProductCount(prevCount => prevCount + 1);
      const price = parseInt(product?.price)
      dispatch(addPrice(price))
    } catch (error) {
      console.log("Something went wrong while adding product in cart" , error)
    }
  }

  const handleDecreaseQuantity  = async ()=>{
    try {
      const decrease = await axios.delete(`${import.meta.env.VITE_AWS_API}api/v1/users/decreaseProductQuantity?userId=${cookies?.userData._id}&productId=${productId}`)
      setProductCount(prevCount => Math.max(prevCount - 1, 1));
      const price = parseInt(product?.price)
      dispatch(removePrice(price))
    } catch (error) {
      console.log("Something went wrong while decreasing product quantity" , error)
    }
  }

  useEffect(()=>{
    const fetchProductCount = async ()=>{
      try {
        const count = await axios.get(`${import.meta.env.VITE_AWS_API}/api/v1/users/productCount?userId=${cookies.userData._id}&productId=${productId}`)
        setProductCount(count?.data?.data)
      } catch (error) {
        console.log("Something went wrong while fetching product count" , error)
      }
    }
    fetchProductCount()
  },[productId])

  return (
    <Card className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-card text-card-foreground">
      <Image
        src={product?.imageLink}
        alt="Product Image"
        width={120}
        height={120}
        className="rounded-md object-cover"
        style={{ aspectRatio: "120/120", objectFit: "cover" }}
      />
      <div className="flex-1 grid gap-2">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{product?.name}</h3>
          <div className="text-lg font-semibold">₹{product?.price}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button color="primary" variant="light" onClick={handleDecreaseQuantity} className="w-8 h-8 hover:bg-muted">
              <MinusIcon className="w-5 h-5" />
            </Button>
            <div className="text-lg font-semibold">{productCount}</div>
            <Button color="primary" variant="light" onClick={handleIncreaseQuantity} className="w-8 h-8 hover:bg-muted">
            <FaPlus />
            </Button>
          </div>
          <Button color="danger" variant="light" onClick={handleDelete} className="ml-auto w-8 h-8 hover:bg-muted">
            <TrashIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
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