const { EventEmitterAsyncResource } = require('nodemailer/lib/xoauth2');
const faculty=require('../Models/FacultySchema');


module.exports={
    login:async(req,res)=>{
        const {email,password}=req.body;
        try {
            const existing=await faculty.findOne({$and:[{email:email},{role:"FACULTY"},{password:password} ]});
            if(existing){
                return res.status(200).json( {message : "Login Successful",existing});
            }
            else{
                return res.status(400).json({message:"Invalid Credentials"});
            }
        } catch (error) {
          res.status(500).json({message:"Internal Server Error"});
        }
    },
    ApproveStudentAdmision:async(req,res)=>{
        const {_id}=req.body;
        try {
            const existing=await faculty.findOne({$and:[{_id:_id},{role:"FACULTY"}]});
            if(existing){
                return res.status(200).json( "Faculty is Authorized to Approve Student Admission");
            }
            else{
                return res.status(400).json({message:"Invalid Credentials"});
            }
        } catch (error) {
          res.status(500).json({message:"Internal Server Error"});
        }
    }

}
