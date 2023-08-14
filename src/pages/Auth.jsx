import React, { useEffect, useState } from 'react'
import { Login, Signup } from '../components'
import { useNavigate } from 'react-router-dom'



const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const token = localStorage.getItem('token');
  const navigate = useNavigate()


  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[])


  return (
    <div> 
        {isSignUp ? (
          <Login setIsSignUp={setIsSignUp} />
        ):(
          <Signup setIsSignUp={setIsSignUp}/>
        )}

    </div>
  )
}

export default Auth