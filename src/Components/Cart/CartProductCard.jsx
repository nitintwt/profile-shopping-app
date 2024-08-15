import {Button} from "@nextui-org/button";
import axios from "axios";
import { useEffect, useState } from "react";

function CartProductCard(productId) {
  const [product , setProduct]= useState()

  useEffect(()=>{
    const fetchProductData = async ()=>{
      try {
        const productData = await axios.get(`/api/v1/users/product?productId=${productId}`)
        console.log(productData)
      } catch (error) {
        console.log("Something went wrong while fetching product data" , error)
      }
    }
    fetchProductData()
  },[productId])

  return (
      <div key={item.id} className="grid grid-cols-[120px_1fr_120px] items-center gap-4">
        <img
          src="/placeholder.svg"
          alt={item.name}
          width={120}
          height={120}
          className="rounded-lg object-cover"
          style={{ aspectRatio: "120/120", objectFit: "cover" }}
        />
        <div className="grid gap-1">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-muted-foreground">${item.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => handleDecrement(item.id)}>
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <span className="font-medium">{item.quantity}</span>
          <Button variant="outline" size="icon" onClick={() => handleIncrement(item.id)}>
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
          <Button variant="destructive" size="icon" onClick={() => handleRemove(item.id)}>
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Remove from cart</span>
          </Button>
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
