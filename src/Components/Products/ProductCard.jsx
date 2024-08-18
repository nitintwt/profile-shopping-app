import {Button} from "@nextui-org/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { Image } from "@nextui-org/react";

export default function ProductCard({productId , imageLink , name , price , handleAddToCart}) {
  const [isAdded , setIsAdded]= useState(false)
  const [cookies] = useCookies();

  
  useEffect(()=>{
    const checkProductInCart = async ()=>{
      try {
        const check = await axios.get(`${import.meta.env.VITE_AWS_API}/api/v1/users/checkProductInCart?userId=${cookies?.userData?._id}&productId=${productId}`)
        setIsAdded(check?.data?.data)
      } catch (error) {
        console.log("Something went wrong while checking cart data" , error)
      }
    }
    checkProductInCart()
  },[productId , handleAddToCart])


  return (
    <div className="bg-background text-white dark rounded-lg shadow-lg overflow-hidden w-full max-w-sm">
      <div className="aspect-[4/3] relative">
      <Image
        src={imageLink}
        alt="Product Image"
        width={400}
        height={300}
        objectFit="cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">₹{price}</span>
          { isAdded ? (
            <Button color="primary" variant="faded">Added</Button>
          ) : (
            <Button color="primary" variant="ghost" onClick={async () => await handleAddToCart(productId)}>Add to Cart</Button>
          )}
        </div>
      </div>
    </div>
  )
}

//https://images.pexels.com/photos/9558577/pexels-photo-9558577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
// https://images.pexels.com/photos/9558724/pexels-photo-9558724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
// https://images.pexels.com/photos/6311646/pexels-photo-6311646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
/*
https://images.pexels.com/photos/6311538/pexels-photo-6311538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://images.pexels.com/photos/9558901/pexels-photo-9558901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://images.pexels.com/photos/9604186/pexels-photo-9604186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://images.pexels.com/photos/1475418/pexels-photo-1475418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://images.pexels.com/photos/2072454/pexels-photo-2072454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
https://images.pexels.com/photos/9558684/pexels-photo-9558684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
*/