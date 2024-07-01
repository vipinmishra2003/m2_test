const faculty=require("../Models/FacultySchema")
const otpVerification = require('../Models/otpVerification.schema');

module.exports = {
    VerifyOTP: async (req, res) => {
        const { email, otp } = req.body;
        try {
            const findOtp = await otpVerification.findOne({ email: email })

            if (!findOtp) {
                return res.status(404).json({ message: "Email doesn't exist" })
            }

            if (findOtp !== otp) {
                return res.status(401).json({ message: "Otp is not matched" })
            }
            const updatedUser = await faculty.findOneAndUpdate(
                { email: email },
                { isVerified: true },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(500).json({ message: "User update failed" });
            }

            await otpVerification.findOneAndDelete({ email: email })
            return res.status(200).json({ message: "Otp Verified" })
        }
        catch (err) {
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    },

    resend: async (req, res) => {
        const { email } = req.body;
        try {
            const user = await faculty.findOne({ email: email })
            if (!user) {
                return res.status(409).json({ Message: "Data is not exist" });
            }
            let otp = Math.floor(1000 + Math.random() * 9000);

            let updateRes = await otpVerfication.findOneAndUpdate(
                { email: email },
                { $set: { otp: otp, isVerified: false } },
                { new: true }
            );
            if (updateRes) {
                var subject = "OTP";
                var text = `Your OTP to verify : ${otp}`;
                const mail = await Helper.sendOtp(req.body.email, subject, text)
                if (!mail) {
                    console.error("Error sending OTP email:", error);
                    return res.status(500).json({ message: "Error sending OTP" });
                }
                return res.status(200).json({ message: "Otp Send Successfully" })
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            return res.status(500).json({ Message: "Something went wrong", result: error })
        }
    }
}
// module.exports=handleOtp;