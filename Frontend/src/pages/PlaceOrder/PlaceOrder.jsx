import React, { use, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext, useState } from 'react'
import axios from 'axios'

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems,url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }

  //small p plcaeOrder
  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
  }


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <div className="multi-fields">
            <input type="text" placeholder='First Name' name='firstName' onChange={onChangeHandler} value={data.firstName} required />
            <input type="text" placeholder='Last Name' name='lastName' onChange={onChangeHandler} value={data.lastName} required />
          </div>
          <input type="email" placeholder='Email Address' name='email' onChange={onChangeHandler} value={data.email} required />
          <input type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street} required />
          <div className="multi-fields">
            <input type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} required />
            <input type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state} required />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='ZipCode' name='zipcode' onChange={onChangeHandler} value={data.zipcode} required />
            <input type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} required />
          </div>
          <input type="text" placeholder='Phone' name='phone' onChange={onChangeHandler} value={data.phone} required />
      </div>     
      <div className="place-holder-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
