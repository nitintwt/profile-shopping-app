import { useState } from "react"
import {Button, ButtonGroup} from "@nextui-org/button";
import { Link } from "react-router-dom";
import CartProductCard from "../Components/Cart/CartProductCard";
import AllCartProducts from "../Components/Cart/AllCartProducts";
import { useDispatch , useSelector} from 'react-redux';

export default function Cart() {
  const dispatch = useDispatch()
  const totalPrice = useSelector((state)=> state?.product?.totalPriceOfCartItem)
  console.log(totalPrice)

  return (
    <div className="w-full h-screen bg-gray-950">
      <div className="cont dark px-4 py-12 text-white  bg-gray-950">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className=" ">
          <div className="m-5">
            <AllCartProducts/>
          </div>
          <div className="bg-muted/40 rounded-lg p-6 grid gap-4">
          <div className="flex items-center justify-between">
              <h3 className="font-medium">Subtotal</h3>
              <span></span>
            </div>
            <hr/>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Total</h3>
              <span className="text-2xl font-bold">{totalPrice}</span>
            </div>
            <div className="flex justify-end">
              <Button color="primary" variant='shadow' >
                <Link to="/checkout">
                 Checkout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


