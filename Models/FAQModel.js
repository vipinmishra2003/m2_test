const mongoose=require("mongoose");

const FaqShema=new mongoose.Schema({

    problem:{
        type:String,
    },
    solution:{
      type:String,
    },
    status:{
        type:String,
        enum:["ACTIVE","BLOCK","DELETE"],
        default:"ACTIVE"
    },
    role:{
        type:String,
        enum:["ADMIN","STUDENT","FACULTY"]
    }
})
const FAQ=mongoose.model("FAQ",FaqShema);

async function createfaq(){
    const faqexisting=await FAQ.find({});
    try {
        if(faqexisting.length!==0){
          console.log("FAQ already created")  
        }
        else{
            const object=[
                {
                  problem:"problem no1",
                  solution:"solution no1",
                  status:"ACTIVE"
                },
                {
                 problem:"problem no2",
                 solution:"solution no2",
                 status:"ACTIVE"
                },
                {
                    problem:"problem  no3",
                    solution:"solution no3",
                    status:"ACTIVE",
                }
            ]
            const createFAQ= await FAQ.create(object);
            console.log("Default FAQ is created",createFAQ)
        }

    } catch(error) {
        console.log("There is internal error",error)
    } 
   
}
createfaq();
    

