import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../pages/NotFound.tsx'
import CreateTicket from '../pages/CreateTicket.tsx'
import Login from '../pages/Login.tsx'
import Signup from '../pages/Signup.tsx'
import Home from '../pages/Home.tsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="*" element={<NotFound />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default AppRoutes