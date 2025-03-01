import React from 'react'
import './LoginPopup.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'

const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("Sign Up");
    return (
        <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Sign Up"?<input type="text" placeholder="Name" required/>:<></>}
                <input type="text" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
                <button>{currState==="Sign Up"?"Create Account":"Login"}</button>
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>{setCurrState("Sign Up")}}>Click here</span></p>
            :<p>Already have an account <span onClick={()=>{setCurrState("Login")}}>Login here</span></p>}
        </form>
        </div>
    )
}

export default LoginPopup
