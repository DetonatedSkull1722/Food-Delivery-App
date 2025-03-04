import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js'
import { Router } from 'express'
import authMiddleware from '../middleware/auth.js';

const cartRouter = Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter