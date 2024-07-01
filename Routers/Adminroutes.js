const express = require("express");
const adminRouter = express.Router();
const Admincontroller = require("../Controllers/AdminController");
const middleware = require("../middlewares/Auth");
const facultyRouter = require("./Facultyroutes");
const FaqController = require("../Controllers/FaqController");
const handleOtp  = require('../Controllers/verifyOtpController');
const StaticController = require("../Controllers/StaticController");



adminRouter.post('/verify-otp', handleOtp.VerifyOTP)

adminRouter.post('/resend-otp', handleOtp.resend)

adminRouter.post(
  "/createfaculty",
  middleware.verifyAdmin,
  Admincontroller.createfaculty
);

adminRouter.get(
  "/getfaculty",
  middleware.verifyAdmin,
  Admincontroller.getFaculty
);

adminRouter.get(
  "/getStudentById",
  middleware.verifyAdmin,
  Admincontroller.getStudentById
);

adminRouter.get(
  "/getFacultyById",
  middleware.verifyAdmin,
  Admincontroller.getFacultyByDepartment
);

facultyRouter.put(
  "/updatestatus",
  middleware.verifyAdmin,
  Admincontroller.ApproveAdmision
);

adminRouter.post(
  "/Adminlogin",
  middleware.verifyAdmin,
  Admincontroller.Adminlogin
);

adminRouter.post(
  "/createDepartment",
  middleware.verifyAdmin,
  Admincontroller.createDepartment
);

adminRouter.post(
  "/createCourse",
  middleware.verifyAdmin,
  Admincontroller.createCourse
);

// routes for Frequently asked questions
adminRouter.post("/addfaq",middleware.verifyAdmin,StaticController.staticList);
adminRouter.get("/getfaq",middleware.verifyAdmin,StaticController.staticView);
adminRouter.put("/updatefaq",middleware.verifyAdmin,StaticController.staticEdit);
adminRouter.delete("/deletefaq",middleware.verifyAdmin,StaticController.staticActive);
adminRouter.delete("/deletefaq",middleware.verifyAdmin,StaticController.staticBlock);

//routes for static content
adminRouter.post("/addfaq",middleware.verifyAdmin,FaqController.addfaq);
adminRouter.get("/getfaq",middleware.verifyAdmin,FaqController.Getfaq);
adminRouter.put("/updatefaq",middleware.verifyAdmin,FaqController.updatefaq);
adminRouter.delete("/deletefaq",middleware.verifyAdmin,FaqController.Deletefaq);


module.exports = adminRouter;
