import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../pages/NotFound.tsx'
import CreateTicket from '../pages/CreateTicket.tsx'
import Login from '../pages/Login.tsx'
import Signup from '../pages/Signup.tsx'
import Home from '../pages/Home.tsx'
import AllTickets from '../pages/AllTickets.tsx'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tickets" element={<CreateTicket />} />
        <Route path="/my-tickets" element={<AllTickets />} />
        <Route path="*" element={<NotFound />} />

      </Routes> 
    </BrowserRouter>
  )
}

export default AppRoutes