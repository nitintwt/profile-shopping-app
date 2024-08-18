import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import CheckoutProductCard from './CheckoutProductCard';
import { useDispatch , useSelector } from 'react-redux';
import { addProduct } from '../../Store/productSlice';

function OrderSummary() {
  const [products , setProducts]= useState([])
  const [cookies] = useCookies();
  const dispatch = useDispatch()
  const totalPrice = useSelector((state)=> state.product.totalPriceOfCartItem)

  useEffect(()=>{
    const fetchAllCartProducts = async ()=>{
      try {
        const productsData = await axios.get(`${process.env.AWS_API}/api/v1/users/cartProducts?userId=${cookies?.userData?._id}`)
        setProducts(productsData?.data?.data)
        dispatch(addProduct(productsData?.data?.data));
      } catch (error) {
        console.log("Something went wrong while fetching")
      }
    }
    fetchAllCartProducts()
  },[cookies])

  return (
    <Fragment>
      <ul className="space-y-4">
       {products?.map((product)=> <CheckoutProductCard productId={product} key={product}/>)}
      </ul>
      <hr className="my-6" />
      <div className="grid grid-cols-2 gap-2">
        <p className="text-muted-foreground dark:text-muted-foreground font-medium">Total:</p>
        <p className="text-right font-medium">₹{totalPrice}</p>
      </div>
    </Fragment>
  )
}

export default OrderSummary
