import { Link, NavLink, useFetcher } from 'react-router-dom';
import OrderSummary from '../Components/Checkout/OrderSummary';
import CheckoutForm from '../Components/Checkout/CheckoutForm';
import { Fragment, useState } from 'react';
import { toast, Toaster } from 'sonner';
import axios from 'axios';
import { Cookies , useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {Button, ButtonGroup} from "@nextui-org/button";
import { deleteAllProductFromCart, totalPriceZero } from '../Store/productSlice';

export default function Component() {
  const [booked , setBooked]= useState(false)
  const [booking , setBooking]= useState(false)
  const cookies = useCookies()
  const [address , setAddress]= useState()
  const dispatch = useDispatch()
  const productsId = useSelector((state)=> state.product.totalProducts)
  console.log( "redux data", productsId)


  const handleBooking = async ()=>{
    setBooking(true)
    try {
      const booking = await axios.post(`${import.meta.env.VITE_AWS_API}/api/v1/users/purchase`, {
        userId:cookies[0]?.userData?._id,
        productsId:productsId,
        address:address
      })
      setBooked(true)
      dispatch(deleteAllProductFromCart())
      dispatch(totalPriceZero())
      console.log("booking" , booking)
    } catch (error) {
      setBooking(false)
      toast.error("Something went wrong. Try again")
      console.log("Something went wrong while booking your order" , error)
    }
  }
  return (
    <Fragment>
      { booked ? (
        <div className="flex flex-col items-center justify-center h-screen dark text-white bg-gray-950">        <div className="max-w-md p-8 bg-background rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center gap-6">
              <CircleCheckIcon className="w-16 h-16 text-green-500" />
              <h2 className="text-2xl font-bold">Your purchase was successfull</h2>
              <p className="text-muted-foreground">
                Thank you for ordering. Please check your email for further information and updates.
              </p>
            </div>
          </div>
        </div>
      ): (
      <div className="flex dark flex-col min-h-screen dark:bg-background dark:text-foreground">
        <main className="flex-1 py-12">
          <div className="container mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h1 className="text-3xl font-bold mb-6 pl-5">Order Summary</h1>
              <div className="bg-muted dark:bg-card dark:text-card-foreground p-6 rounded-md">
                <OrderSummary/>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold pl-6">Checkout</h1>
              <CheckoutForm address={address} setAddress={setAddress}/>
              <div className='flex justify-end m-5'>
                {booking ? (
                  <Button type="submit" className="w-full" color='primary' variant='shadow' isLoading>
                   Ordering...
                  </Button>
                ) : (
                <Button type="submit" className="w-full" color='primary' variant='shadow' onClick={handleBooking}>
                  Place Order
                 </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>)}
      <Toaster position='bottom-center'/>
    </Fragment>
  )
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
