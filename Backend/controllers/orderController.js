import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing frontend order
const placeOrder = async (req,res)=>{

    const frontend_rul = "https://localhost:5173";
    
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amout,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map(()=>({
            price_data:{
                currency:"usd",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100//converting into cents
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"usd",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: ine_items,
            mode:'payment',
            success_url:`${frontend_rul}/verify?success=true&orderid=${newOrder._id}`,
            cancel_url:`${frontend_rul}/verify?success=false&orderid=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"}) 
    }
}

export {placeOrder}