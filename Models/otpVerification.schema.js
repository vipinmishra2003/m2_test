const mongoose=require('mongoose')

const otpVerify = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    OTP: {
        type: Number,
        require: true
    }
})

module.exports=mongoose.model("otpVerification",otpVerify);