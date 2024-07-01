const FAQ=require("../Models/FAQModel");

module.exports={
    
addfaq:async(req,res)=>{
    const {problem,solution,role}=req.body;
    try {
        await FAQ.create({problem:problem,solution:solution,role:role})
        res.status(200).send("faq create dsuccessfully",)
    } catch (error) {
       res.status(400).send("internal error",error) 
    }
},
 Deletefaq:async(req,res)=>{
    const {_id}=req.query;
    try {
        await FAQ.findOneAndDelete({_id:_id})  
        res.status(200).send("faq1 deleted successfully")
    } catch (error) {
       res.status(400).send("internal error",error) 
    }
 },
 updatefaq:async(req,res)=>{
    const {_id}=req.params;
    const {Updatedproblem,Updatedsolution,Updatedrole}=req.body;
    try {
       await FAQ.findByIdAndUpdate({_id:_id},{$set:{problem:Updatedproblem,solution:Updatedsolution,role:Updatedrole}}) ;
       res.status(200).send("faq updated successfully")

    } catch (error) {
        res.status(400).send("internal error",error)
    }
 },
Getfaq:async(req,res)=>{
    const role=req.role;
    try {
        const existing=await FAQ.findOne({role:role})
        res.status(200).send("faq found",existing)
    } catch (error) {
       res.send("internal server eroor",error) 
    }
}
}