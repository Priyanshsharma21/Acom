import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Loader1 } from '../components/Loaders'
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai'

const UserDashboard = () => {
    const [userInfo, setUserInfo] = useState(null)
    const {id} = useParams()
    const {VITE_URL} = import.meta.env
    const token = localStorage.getItem('token');
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        setLoader(true)

        const fetchData = async()=>{
            try {
                const options = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
                }
                const res = await axios.get(`${VITE_URL}/user/${id}`,options)
                
                if(res.data.status){
                    setLoader(false)
                    setUserInfo(res.data.data)
                }
            } catch (error) {
                console.log(error)
                setLoader(false)
            }
        }
        fetchData()
    },[])

    const handleLogout = async () => {
        try {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate('/');
        } catch (error) {
          toast(error.message);
        }
      };



  return (
    <div className="flex flex-col w-full h-screen bg-[#0b0d10]">
    {loader ? (
        <div className="flex justify-center items-center w-full h-screen">
        <Loader1 />
        </div>
    ):(
        <div className="flex justify-center items-center w-full h-screen">
            <div className="glassCard p-5">
            
                <div className="img_of_user flex justify-center">
                    <img className="h-24 w-auto rounded-full" src={userInfo?.photo?.secure_url} alt={userInfo?.name} />
                </div>
                
                <div className="user_main_info mt-5">
                <div className="logouticon flex justify-center">
                <AiOutlineLogout className="text-red-500 logout_btn" onClick={handleLogout} />
                </div>
                    <div className="username mt-3 text-slate-100 uppercase">
                        {userInfo?.name}
                    </div>

                    <div className="mt-3 text-slate-100">
                        {userInfo?.email}
                    </div>
                </div>
            </div>
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

export default UserDashboard