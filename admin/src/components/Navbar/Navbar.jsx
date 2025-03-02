import "./Navbar.css";
import React from 'react'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" alt="" src={assets.profile_image} />
    </div>
  )
}

export default Navbar
