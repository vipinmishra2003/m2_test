const Faculty=require("../Models/FacultySchema")
module.exports={
    Signup:async(req,res)=>{
        const {first_name,last_name,email,password,role,department,course,country,state,city,}=req.body;
        try {
            const existing= await Faculty.findOne({email:email});
            if(existing){
                return res.status(400).json({message:"Student already exists"});
            }
          else{
               await Faculty.create({
               first_name:first_name,
               last_name:last_name,
               email:email,
               password:password,
               role:role,
               department:department,
               course:course,
               country:country,
               state:state,
               city:city,

                });
    return res.status(200).json({message:"Signup Successful"});         
        }
     } catch (error) {
           res.status(500).json({message:"Internal Server Error"});
        }
    },
    Login:async(req,res)=>{
        const {email,password}=req.body;
        try {
            const existing=await Faculty.findOne({ $and:[{email:email,password:password} ,{role:"STUDENT"}]});
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
}