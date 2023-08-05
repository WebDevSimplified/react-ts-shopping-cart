require("dotenv").config()
const express =require("express")
const app=express()
const mongoose=require("mongoose")
const cors = require("cors");
const stripe=require('./routes/stripe')
app.use(express.json());
app.use(cors());
app.use('/api/stripe',stripe)
app.get("/",(req,res)=>{
    res.send("Welcome to CMHcakes.com!!!!");
});


    app.listen(process.env.PORT|| PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });

  
