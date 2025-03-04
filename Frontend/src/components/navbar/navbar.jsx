import React, { useState } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");   
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const logout=()=>{
        console.log("Logout triggered");
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    return (
        <div className="navbar">
            <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/'><li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li></Link>
                <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
                <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li>
                <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
                :<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className='nav-profile-dropdown'>
                        <Link to='/order'><li><img src={assets.bag_icon} alt="" />Orders</li></Link>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt=""/>Logout</li>
                    </ul>    
                </div>}
            </div>
        </div>
    )
}

export default navbar
