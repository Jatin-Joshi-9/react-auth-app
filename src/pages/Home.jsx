import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, []);

  return (
      <h1 className='text-2xl font-bold'>Welcome to the Home Page</h1>
  )
}

export default Home