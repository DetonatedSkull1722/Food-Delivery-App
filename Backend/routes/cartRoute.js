import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js'
import { Router } from 'express'
import authmiddeleware from '../middleware/auth.js';

const cartRouter = Router();

cartRouter.post("/add", authmiddeleware, addToCart);
cartRouter.post("/remove", authmiddeleware, removeFromCart);
cartRouter.get("/get", authmiddeleware, getCart);

export default cartRouter