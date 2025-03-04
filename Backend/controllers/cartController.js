import userModel from "../models/userModel.js";

//add items to userCart 
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData});
        res.json({message: "Item added to cart", success: true});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

//remove items from userCart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] === 1){
            delete cartData[req.body.itemId];
        }
        else if(cartData[req.body.itemId] > 1){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData});
        res.json({message: "Item removed from cart", success: true});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

//fetch items from cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({cartData, success: true});
    } catch (error) {
        res.json({success: false, message: "Error"});
    }
}

export {addToCart, removeFromCart, getCart}