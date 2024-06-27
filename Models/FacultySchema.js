const mongoose = require('mongoose');

const FacultySchema=new mongoose.Schema({
        first_name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['ADMIN','TEACHER','STUDENT'],
        },
        status: {
            type: "String",
            default: "ACTIVE",
            enum: ["ACTIVE", "DELETE", "BLOCK"]
        },
        department:{
            type:String,
            enum:['COMPUTER SCIENCE','INFORMATION TECHNOLOGY','ELECTRONICS','MECHANICAL','CIVIL','ELECTRICAL','MECHATRONICS']
        },
        course:{
            type:String,
            
        },
        country:{
           type:String,
        },
        state:{
            type:String,
        },
        city:{
            type:String,
        },
        dialing_code:{
            type:Number,
        },
        phone:{
            type:Number,
            required:true
        },
        qr:{
            type:String,
        }
        
},{timestamps:true});

const Faculty=mongoose.model('Faculty',FacultySchema);
module.exports=Faculty;