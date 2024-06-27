const express=require('express');
const dotenev=require('dotenv').config();
const connectDB=require('./Connection/connection');
const app=express();

// const PORT=process.env.PORT || 4000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
connectDB();
app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is running on port ${process.env.PORT}`);

});