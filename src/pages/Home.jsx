import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const useNavigateHook = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            console.log("Token found:", token);
        } else {
            useNavigateHook("/login");
        }
    }, []);

  return (
      <h1 className='text-2xl font-bold'>Welcome to the Home Page</h1>
  )
}

export default Home