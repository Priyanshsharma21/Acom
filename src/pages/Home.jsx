import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Loader1 } from '../components/Loaders'
import { ProductList, Filters } from '../components'


const Home = () => {
  const [products, setProducts] = useState([])
  const {VITE_URL} = import.meta.env
  const token = localStorage.getItem('token');
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const [totalPages, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    setLoader(true)

    const fetchData = async()=>{
        try {
            const page = currentPage;
            const res = await axios.get(`${VITE_URL}/products?page=${page}`);
            if(res.data.status){
                setLoader(false)
                setProducts(res.data.products)
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    fetchData()
},[currentPage])


const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


  return (
    <div className="w-full min-h-screen bg-[#020202]">

    {loader ? (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader1 />
      </div>
    ):(
      <>
        <Filters setProducts={setProducts} />
        <ProductList products={products}/>

        <nav className="flex items-center justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <p
                                key={page}
                                className={`inline-flex cursor-pointer items-center px-3 py-2 border-t-2 ${
                                    currentPage === page
                                        ? 'border-indigo-300 text-slate-200'
                                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'
                                }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </p>
                        ))}
          </nav>
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

export default Home