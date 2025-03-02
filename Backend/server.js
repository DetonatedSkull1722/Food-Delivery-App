import express from "express";
import cors from "cors";


//app cnfig
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("API is running");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})