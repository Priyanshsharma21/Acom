import { useState,Fragment, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigation } from '../constants'
import { Link, useNavigate } from 'react-router-dom'
import { logo } from '../assets'
import { BsSearch,BsCartPlus } from 'react-icons/bs'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Avatar, Badge, Space } from 'antd';
import axios from 'axios'


export default function Navbar({changeInCart}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchChange,handleSeachChange] = useState("")
  const [open, setOpen] = useState(false)
  const [cartCount, setCartCount] = useState([])
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) 
  const navigate = useNavigate()
  const {VITE_URL} = import.meta.env


  const handleSearchSubmit = (e)=>{
    e.preventDefault()
    navigate(`/category/${searchChange}`)
    setOpen(false)
  }


  useEffect(()=>{
    const fetchCart = async()=>{
      try {
        const res = await axios.get(`${VITE_URL}/cart/${user?._id}`)

        if(res.data.success){
          setCartCount(res.data.cart)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchCart()
  },[changeInCart])



  const handleCart = ()=>{
    navigate('/mycart')
  }

console.log(cartCount)


  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">

        <div className="search_bar items-center flex mr-14 cursor-pointer" onClick={()=>setOpen((prev)=>!prev)}>
          <BsSearch className="text-white text-2xl" />
        </div>


          {token ? (
            <Link to={`/user/${user?._id}`} className="showUserImg">
              <img  src={user?.photo?.secure_url} className="h-14 w-auto rounded-full" title={user?.name} alt="User Profile" />
            </Link>
          ):(
            <Link to="/auth" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
          )}


          <div className="cart" onClick={handleCart}>
            <Badge count={cartCount?.length} className="cursor-pointer">
              <BsCartPlus className="ml-5 text-white text-3xl"/>
            </Badge>
          </div>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src={logo}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
              <div className="search_bar items-center flex mr-14 cursor-pointer" onClick={()=>setOpen((prev)=>!prev)}>
                <BsSearch className="text-white text-2xl" />
              </div>
              <div className="mt-14">
              {token ? (
                  <Link to={`/user/${user?._id}`} className="showUserImg flex">
                    <img className="h-14 w-auto rounded-full" src={user?.photo?.secure_url} alt="User Profile" />
                    <div className="name text-slate-200 items-center flex ml-4">
                      {user?.name}
                    </div>
                  </Link>
                ):(
                  <Link to="/auth" className="text-sm font-semibold leading-6 text-white">
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
                )}
              </div>


              <div className="cart mt-10" onClick={handleCart}>
                <Badge count={cartCount?.length} className="cursor-pointer">
                  <BsCartPlus className=" text-white text-3xl"/>
                </Badge>
              </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>





    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg make_me_tp px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                 
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-200">
                      Search Products
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={handleSearchSubmit}>
                      <input
                        type="text"
                        name="search"
                        placeholder='Anime T-shirt'
                        id="search"
                        onChange={(e)=>handleSeachChange(e.target.value)}
                        className="block mt-5 w-full rounded-md border-0 bg-[#22222237] py-1.5 pr-14 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                      />
                      </form>
                    </div>
                  </div>
                </div>
               
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </header>
  )
}
