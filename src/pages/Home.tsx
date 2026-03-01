import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1 className='text-2xl font-bold text-center mt-10'>Welcome to the Home Page</h1>
      <button className='bg-blue-200 border-black border font-bold rounded-3xl  py-2 px-5 cursor-grab mt-5'
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>
        Logout
      </button>

      <button className='bg-blue-200 border-black border font-bold rounded-3xl  py-2 px-5 cursor-grab mt-5'
        onClick={() => {
          navigate("/tickets");
        }}>
        Create Ticket
      </button>
    </div>
  )
}

export default Home
