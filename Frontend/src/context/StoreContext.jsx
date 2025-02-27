import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
    
    const [cartItems, setCartItems] =useState({});

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev=>({...prev, [itemId]:1})))
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            if (newCartItems[itemId] === 1) {
                delete newCartItems[itemId];
            } else {
                newCartItems[itemId] -= 1;
            }
            return newCartItems;
        });
    };

    const contextValue = {
        food_list,
        cartItems, 
        setCartItems,
        addToCart,
        removeFromCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider