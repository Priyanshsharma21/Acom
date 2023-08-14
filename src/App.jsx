import React, { useEffect, useState } from 'react'
import { Navbar,Preloader } from './components'
import { Home, Auth, UserDashboard, ProductDetails,Category,Cart,Checkout } from './pages'
import { Route, Routes, useNavigate } from "react-router-dom";


const App = () => {
  const [preLoader, setPreLoader] = useState(true);
  const [timer, setTimer] = useState(2);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [changeInCart, setChangeInCart] = useState(false)
  
  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setPreLoader(false);
    }
  }, [timer, token]);


  return (
    <div className="w-full flex flex-col">
      {preLoader ? (
        <div className="w-full h-screen flex justify-center items-center bg-black">  
          <Preloader />
        </div>
      ):(
        <>
          <Navbar changeInCart={changeInCart}/>
          <div className="main w-full flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/user/:id" element={<UserDashboard />} />
              <Route path="/product/:id" element={<ProductDetails setChangeInCart={setChangeInCart}/>} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/mycart" element={<Cart setChangeInCart={setChangeInCart}/>} />
              <Route path="/checkout" element={<Checkout />} />

              
            </Routes>
          </div>
        </>
      )}

    </div>
  )
}

export default App