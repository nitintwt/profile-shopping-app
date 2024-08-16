import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import Products from './Pages/Products.jsx'
import Cart from './Pages/Cart.jsx'
import Checkout from './Pages/Checkout.jsx'
import AuthLayout from './Components/ui/AuthLayout.jsx'
import Orders from './Pages/Orders.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'

const router = createBrowserRouter([
  {
    path:'',
    element: <Layout/>,
    children:[
      {
        path:'/signup',
        element:<Signup/>,
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/',
        element:<Products/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/checkout',
        element:(
          <AuthLayout>
            <Checkout/>
          </AuthLayout>
        )
      },
      {
        path:'/orders',
        element:(
          <AuthLayout>
            <Orders/>
          </AuthLayout>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <NextUIProvider>
     <RouterProvider router={router}/>
    </NextUIProvider>
    </Provider>
  </StrictMode>,
)
