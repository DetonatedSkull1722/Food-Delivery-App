import React from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const cart = () => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          {getTotalCartAmount()===0?<h1>Your cart is empty</h1>
          :<><div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          </>}
          {food_list.map((item, index)=>{
            if(cartItems[item._id]>0){
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price*cartItems[item._id]}</p>
                    <p onClick={()=>{removeFromCart(item._id)}} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })}
        </div>
        {getTotalCartAmount()>0?<div className="cart-bottom">
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
                <p>${getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
            </div>
            <button onClick={()=>{navigate('/order')}}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promocode, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>:<div className="cart-empty"></div>}
      </div>
    </div>
  )
}

export default cart
