const mongoose = require('mongoose');
const departmentShema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Faculty'
    }
},{timestamps:true});
Department=mongoose.model('Department',departmentShema);
module.exports=Department;