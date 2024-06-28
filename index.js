const express=require('express');
const connectDB=require('./Connection/connection');
const app=express();
const Adminrotes=require("./Routers/Adminroutes");
const Facultyroutes=require("./Routers/Facultyroutes");
const Studentroutes=require("./Routers/StudentRoutes")
const bodyParser=require('body-parser');
// const PORT=process.env.PORT || 4000;
require('dotenv').config();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
connectDB();
app.use("/get",Adminrotes)
app.use("/get",Facultyroutes)
app.use("/get",Studentroutes)

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is running on port ${process.env.PORT}`);

});