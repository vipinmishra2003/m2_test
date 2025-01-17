const express = require("express");
const studentRouter = express.Router();
const middleware = require("../middlewares/Auth");
const studentController = require("../Controllers/Studentcontroller");
const FaqController = require("../Controllers/FaqController");
const handleOtp  = require('../Controllers/verifyOtpController');





studentRouter.post('/verify-otp', handleOtp.VerifyOTP)

studentRouter.post('/resend-otp', handleOtp.resend)
// routes to create new user
studentRouter.post(
  "/signup",
  middleware.verifyStudent,
  studentController.Signup
);

//routes for login
studentRouter.get("/login", middleware.verifyStudent, studentController.Login);

studentRouter.post(
  "/adminsionrequest",
  middleware.verifyStudent,
  studentController.RequesttoAdmision
);

//routes for update profile
studentRouter.put(
  "/updateprofile",
  middleware.verifyStudent,
  studentController.profileupdate
);

//routes to forget password
studentRouter.put(
  "/forgetpassword",
  middleware.verifyStudent,
  studentController.forgetpassword
);

//routes to reset the password
studentRouter.put(
  "/resetpassword",
  middleware.verifyStudent,
  studentController.resetpassword
);

//routrs to delete the profile
studentRouter.put(
  "/deleteprofile",
  middleware.verifyStudent,
  studentController.Deleteprofile
);

//routs to check the status of the application

studentRouter.post(
  "/checkstatus",
  middleware.verifyStudent,
  studentController.checkstatusApplication
);

//routes to create qr code
studentRouter.post(
  "/qrgenerate",
  middleware.verifyStudent,
  studentController.Qrgenerator
);

studentRouter.post("/addfaq",middleware.verifyStudent,FaqController.addfaq)
studentRouter.get("/getfaq",middleware.verifyStudent,FaqController.Getfaq)
module.exports = studentRouter;
