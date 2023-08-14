import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Loader1 } from '../components/Loaders'
import { ProductDetail } from '../components'

import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = ({setChangeInCart}) => {
  const [productDetails, setProductDetails] = useState(null)
  const {id} = useParams()
  const {VITE_URL} = import.meta.env
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()


  useEffect(()=>{
    setLoader(true)

    const fetchData = async()=>{
        try {
            
            const res = await axios.get(`${VITE_URL}/product/${id}`)
            
            if(res.data.status){
                setLoader(false)
                setProductDetails(res.data.product)
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    fetchData()
},[])


  return (
    <div>
    
    {loader ? (
      <div className="w-full h-screen flex justify-center items-center bg-[#0b0d10]">
        <Loader1 />
      </div>
    ):(
      <div className="w-full min-h-[100vh] bg-[#0b0d10]">
      {productDetails && (
        <ProductDetail product={productDetails} setChangeInCart={setChangeInCart}/>
      )}
      </div>
    )}

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

export default ProductDetails