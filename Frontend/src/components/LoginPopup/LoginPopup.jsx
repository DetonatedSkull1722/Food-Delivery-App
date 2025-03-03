import React, { useEffect } from 'react'
import './LoginPopup.css'
import {assets} from '../../assets/assets'
import { useState, useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({name:"",email:"",password:""});
    const {url, token, setToken} = useContext(StoreContext);

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const onLogin = async (event)=>{
        event.preventDefault();
        let newUrl = url;
        if(currState==="Login"){
            newUrl += "/api/user/login";
        }
        else{
            newUrl += "/api/user/register";
        }
        toast.loading("Logging in...");
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            toast.dismiss();
            toast.success(response.data.message);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else{
            toast.error("Error");
            alert(response.data.message);
        }
    }

    return (
        <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Sign Up"?<input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Name" required/>:<></>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder="Email" required/>
                <input name='password' onChange={onChangeHandler} type="password" placeholder="Password" required/>
                <button type="submit">{currState==="Sign Up"?"Create Account":"Login"}</button>
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>{setCurrState("Sign Up")}}>Click here</span></p>
            :<p>Already have an account?<span onClick={()=>{setCurrState("Login")}}> Login here</span></p>}
        </form>
        </div>
    )
}

export default LoginPopup
