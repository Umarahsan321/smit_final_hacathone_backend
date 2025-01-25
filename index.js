
import express from "express";
import  dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config()

mongoose.connect(process.env.MONGODBURI)
.then(()=>console.log("mongodb connected"))
.catch((err) => console.log("err=>", err))
;

const app = express();
const port = 4000;


app.get("/",(req,res)=>{
    console.log("req",req)
    res.send("hello beackend")
});


app.listen(port, ()=> console.log("server is runing on port" + port))
console.log( "MONGODBURI=>",process.env.MONGODBURI)