import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Loader1 } from '../components/Loaders'
import { ProductList } from '../components'


const Category = () => {
    const { id } = useParams()
    const [products, setProducts] = useState([])
    const {VITE_URL} = import.meta.env
    const token = localStorage.getItem('token');
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        setLoader(true)
    
        const fetchData = async()=>{
            try {
                const res = await axios.get(`${VITE_URL}/category/${id}`)
                if(res.data.success){
                    setLoader(false)
                    setProducts(res.data.products)
                }
            } catch (error) {
                console.log(error)
                setLoader(false)
            }
        }
        fetchData()
    },[id])


  return (
    <div className="w-full min-h-screen flex flex-col bg-[#020202]">
        {loader ? (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader1 />
            </div>
            ):(
            <>
            {products.length!==0 ? (
                <>
                <ProductList products={products}/>

                </>
            ):(
                <div className="noitem text-white font-semibold flex justify-center items-center w-full h-screen">
                    No Product Found
                </div>
            )}
            </>
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

export default Category