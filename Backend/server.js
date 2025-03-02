import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

//app cnfig
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection;
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res)=>{
    res.send("API is running");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

