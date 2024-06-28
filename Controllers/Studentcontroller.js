const Faculty=require("../Models/FacultySchema")
const helper=require("../Helper/common")
module.exports={
    Signup:async(req,res)=>{
        const {first_name,last_name,email,password,role,status,department,course,country,state,city,dialing_code,phone,qr}=req.body;
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
               status:status,
               department:department,
               course:course,
               country:country,
               state:state,
               city:city,
               dialing_code:dialing_code,
               phone:phone,
               qr:qr

                });
         return res.status(200).json({message:"Signup Successful",});         
        }
     } catch (error) {
           res.status(500).json({message:"Internal Server Error"});
        }
    },
    Login:async(req,res)=>{
        const {email,password}=req.body;
        try {
            const existing=await Faculty.findOne({ $and:[{email:email,password:password},{role:"STUDENT"}]});
            if(existing.status!=="ACTIVE"){
                res.status(400).json({message:"Invalid Credentials"});
            }
            const payload = { email: email, role: "STUDENT", _id: existing._id }
            const generatedToken = helper.tokenGenerator(payload)

            if(existing){
                return res.status(200).json( {message : "Login Successful",existing,generatedToken});
            }
          
            else{
                return res.status(400).json({message:"Invalid Credentials"});
            }
        } catch (error) {
          res.status(500).json({message:"Internal Server Error"});
        }
    },
    RequesttoAdmision:async(req,res)=>{
        const {_id}=req.body;
        const existing=await Faculty.findOne({$and:[{_id:_id},{role:"student"}]});
        if(existing.status!=="ACTIVE"){
            res.status(400).json({message:"Invalid Credentials"});
        }
        if(existing.role=="STUDENT"){
            return res.status(200).json( "Student is Authorized to Request to Admision");
        }
}, 
}