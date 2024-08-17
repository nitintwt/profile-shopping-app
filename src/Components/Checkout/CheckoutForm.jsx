import React from 'react'
import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/input";
import {Button, ButtonGroup} from "@nextui-org/button";
import { useCookies } from 'react-cookie';

function CheckoutForm({address , setAddress}) {
  const [cookies] = useCookies();

  return (
    <form className="bg-muted dark:bg-card dark:text-card-foreground p-6 rounded-md grid gap-6">
    <div className="grid gap-2">
      <h2 htmlFor="name">Name</h2>
      <Input id="name" defaultValue={cookies?.userData?.name} isReadOnly />
    </div>
    <div className="grid gap-2">
      <h2 htmlFor="email">Email</h2>
      <Input id="email" type="email" isReadOnly defaultValue={cookies?.userData?.email} />
    </div>
    <div className="grid gap-2">
      <h2 htmlFor="address">Address</h2>
      <Textarea id="address" defaultValue={cookies?.[0]?.userData?.address} value={address} onChange={(e)=> setAddress(e.target.value)} />
    </div>

  </form>
  )
}

export default CheckoutForm
