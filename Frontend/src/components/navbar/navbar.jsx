import React, { useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import {assets} from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");   
    const {getTotalCartAmount} = useContext(StoreContext);

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
                <button onClick={()=>setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    )
}

export default navbar
