import { useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Loader1 } from './Loaders'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductDetail = ({product, setChangeInCart}) => {
    const [selectedColor, setSelectedColor] = useState(product.color)
    const {VITE_URL} = import.meta.env
    const user = JSON.parse(localStorage.getItem('user')) 
    const [loader, setLoader] = useState(false)


    const handleAddToCart = async(e)=>{
      e.preventDefault()
      try {
        const res = await axios.post(`${VITE_URL}/cart/add`,{
          "userId" : user?._id,
          "productId" : product?._id
      })

      if(res.data.success){
        setChangeInCart((prev)=>!prev)
        toast("Item Added To Cart")
      }

      console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <div className="w-full min-h-[100vh] bg-[#0b0d10]">
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product?.photos?.map((image) => (
                  <Tab
                    key={image}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img src={image} alt="" className="h-full w-full object-cover object-center" />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-indigo-500' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {product?.photos?.map((image) => (
                <Tab.Panel key={image.id}>
                  <img
                    src={image}
                    alt={image}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-200">{product?.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-300">₹ {product?.price}</p>
            </div>

            {/* Reviews */}
            {/* <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div> */}

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-300"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />
            </div>

            <form className="mt-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-200">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <span className="flex items-center space-x-3">
                    {product.color.map((color) => (
                      <RadioGroup.Option
                        key={color}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedColor,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color}
                        </RadioGroup.Label>
                        <span
                        style={{background : color}}
                          aria-hidden="true"
                          className={`h-8 w-8 rounded-full color_ring border border-white border-opacity-10 bg-${color}-500`}
                        //   className={classNames(
                        //     color,
                        //     'h-8 w-8 rounded-full border border-black border-opacity-10'
                        //   )}
                        />
                        </RadioGroup.Option>
                        ))}
                    </span>
                        </RadioGroup>
              </div>

              <div className="mt-10 flex">
                <button
                  onClick={handleAddToCart}
                  type="submit"
                  className="flex m-2 max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to Cart
                </button>



                {/* <button
                  type="submit"
                  className="flex m-2 max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Remove from Cart
                </button> */}
              </div>
            </form>

            <div className="extra_details mt-5">
                <div className="stock_box flex justify-between">
                        <div className="text-blue-400 font-semibold">
                            Stocks
                        </div>
                    <div className="stocks text-slate-200">
                        {product?.stock}
                    </div>
                </div>

                <div className="stock_box flex justify-between mt-8">
                        <div className="text-blue-400 font-semibold">
                            Brand
                        </div>
                    <div className="stocks text-slate-200">
                        {product?.brand}
                    </div>
                </div>

                <div className="stock_box flex justify-between mt-8">
                        <div className="text-blue-400 font-semibold">
                            Category
                        </div>
                    <div className="stocks text-slate-200">
                        {product?.category}
                    </div>
                </div>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

            </section>
          </div>
        </div>
      </div>
    </div>

    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default ProductDetail

