import axios from "axios";
import { useDeprecatedInvertedScale } from "framer-motion";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch , useSelector} from "react-redux";
import { addProduct } from "../../Store/productSlice";

function CheckoutProductCard({productId}) {
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
      <li className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={product?.imageLink}
            alt="Product Image"
            width={64}
            height={64}
            className="rounded-md"
            style={{ aspectRatio: "64/64", objectFit: "cover" }}
          />
          <div>
            <h3 className="font-medium">{product?.name}</h3>
            <p className="text-muted-foreground dark:text-muted-foreground text-sm">Size: M</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">₹{product?.price}</p>
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">Qty: {productCount}</p>
        </div>
      </li>
    </div>
  )
}

export default CheckoutProductCard
