import React from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

function CartProductSkeleton() {
  return (
    <Card className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-card text-card-foreground animate-pulse">
      <div className="bg-gray-300 rounded-md" style={{ width: "120px", height: "120px", aspectRatio: "120/120" }}></div>
      <div className="flex-1 grid gap-2">
        <div className="flex items-start justify-between">
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded w-10"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded ml-auto"></div>
        </div>
      </div>
    </Card>
  )
}

export default CartProductSkeleton
