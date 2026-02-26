import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup } from './Components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1 className='text-2xl font-bold'>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
