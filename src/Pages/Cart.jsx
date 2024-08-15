import { useState } from "react"
import {Button, ButtonGroup} from "@nextui-org/button";

export default function Cart() {

  return (
    <div className="w-full h-screen bg-gray-950">
          <div className="container dark px-4 py-12 text-white ">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8 ">
      <div className="grid gap-6">

        </div>
        <div className="bg-muted/40 rounded-lg p-6 grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Subtotal</h3>
            <span></span>
          </div>
          <hr/>
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Total</h3>
            <span className="text-2xl font-bold"></span>
          </div>
          <Button size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}


