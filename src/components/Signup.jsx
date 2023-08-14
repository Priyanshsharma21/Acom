import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Loader1 } from '../components/Loaders'


const formData = {
    name : "",
    email : "",
    password: "",
    photo : ""
}





const Signup = ({setIsSignUp}) => {
    const [form, setForm] = useState(formData)
    const [loader, setLoader] = useState(false)
    const {VITE_URL} = import.meta.env

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoader(true)
        try {
            const res = await axios.post(`${VITE_URL}/signup`,form)

            if(res.data.status === true){
                setIsSignUp((prev)=>!prev)
                setLoader(false)
            }
            toast("Successfully Signup.");
            setLoader(false)

        } catch (error) {
            toast(error.response.data.message);
            setLoader(false)
        }
    }

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'photo') {
          const reader = new FileReader();
          reader.readAsDataURL(files[0]);
    
          reader.onload = () => {
            setForm({ ...form, photo: reader.result });
          };
        } else {
            setForm({ ...form, [name]: value });
        }
    };


  return (
    <div className="w-full h-screen bg-[#020202]">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
                Profile Picture
              </label>
              <div className="mt-2">
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
              {loader ? (
                <div className="flex justify-center items-center">
                    <Loader1 />
                </div>
              ):(
                <>
                    Sign in
                </>
              )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400 cursor-pointer">
            Already apprikart member
            <p onClick={()=>setIsSignUp((prev)=>!prev)} className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
              Login
            </p>
          </p>
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

export default Signup