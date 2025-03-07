import { createContext, use, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
    
    const [cartItems, setCartItems] =useState({});
    const url = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);


    useEffect(()=>{
        async function loadData(){
            fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const fetchFoodList = async ()=>{
        const response  = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}});
        setCartItems(response.data.cartData);
    }

    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev=>({...prev, [itemId]:1})))
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
        if(token){
            axios.post(url+"/api/cart/add", {itemId}, {headers:{token}});
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
            if(token){
                axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}});
            }
            return newCartItems;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount =0 ;
        for (const item in cartItems){
            try {
                if (cartItems[item] > 0){
                    let itemInfo = food_list.find((product)=>product._id === item);
                    if (itemInfo) { // Only add if the product is found
                        totalAmount += itemInfo.price * cartItems[item];
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems, 
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider