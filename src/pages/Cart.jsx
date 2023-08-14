import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Loader1 } from '../components/Loaders'
import { ProductList, Filters } from '../components'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import moment from 'moment'

const Cart = ({setChangeInCart}) => {
  const [cart, setCart] = useState([])
  const user = JSON.parse(localStorage.getItem('user')) 
  const {VITE_URL} = import.meta.env
  const [loader, setLoader] = useState(false)
  const [total, setTotal] = useState(0)
  const [makeReload, setMakeReload] = useState(false)


 
  useEffect(()=>{
    const fetchCart = async()=>{
      setLoader(true)
      try {
        const res = await axios.get(`${VITE_URL}/cart/${user?._id}`)

        if(res.data.success){
            setCart(res.data.cart)
            setTotal(res.data.totalPrice)
            setLoader(false)
        }
      } catch (error) {
        console.log(error.message)
        setLoader(false)
      }
    }
    fetchCart()
  },[makeReload])


  const handleRemove = async(e, productId)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${VITE_URL}/cart/remove`,{
        "userId" : user?._id,
        "productId" : productId
    })


    if(res.data.success){
      setChangeInCart((prev)=>!prev)
      setMakeReload((prev)=>!prev)
      toast(res.data.message)
    }

    console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

 


  return (
    <div className="w-full min-h-screen bg-[#020202]">
      {loader ? (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader1 />
      </div>
    ):(
      <>
        {cart.length > 0 ? (
          <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">Shopping Cart</h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cart?.map((product) => (
               
                <li key={product?.product?._id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={product?.product?.photos[0]}
                      alt={product?.product?.name}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <Link to={`/product/${product?.product?._id}`} className="font-medium text-gray-300 hover:text-gray-400">
                            {product?.product?.name}
                          </Link>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-100">₹ {product?.product?.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">Color - {product?.product?.color[0]}</p>
                      <p className="mt-1 text-sm text-gray-300">Size - {product?.product?.size}</p>
                      <p className="mt-1 text-sm text-gray-300">Quantity - {product?.quantity}</p>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <p className="flex items-center space-x-2 text-sm text-gray-400">
                        {product?.product?.stock ? (
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        ) : (
                          <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                        )}
                        
                        <span>{product.inStock ? 'In stock' : `Will ship in 2 Days`}</span>
                      </p>
                      <div className="ml-4">
                        <button onClick={(e)=>handleRemove(e, product?.product?._id)} type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-300">Subtotal</dt>
                  <dd className="ml-4 text-base font-medium text-gray-300">₹ {total}</dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>

            <Link to="/checkout" className="mt-10">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </Link>

            <div className="mt-6 text-center text-sm">
              <p>
                or
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        </form>
      </div>
      </div>
        ):(
          <Link to="/" className="w-full h-[90vh] flex justify-center items-center">
          <button
                type="submit"
                className="w-[200px]  rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Add Item To Cart
              </button>
          </Link>
        )}
      </>
    )}
    </div>
  )
}

export default Cart