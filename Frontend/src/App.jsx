import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Navbar from './components/navbar/navbar'


const App = () => {

  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Cart' element ={<Cart/>}/>
          <Route path ='/Order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
