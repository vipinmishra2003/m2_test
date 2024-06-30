const express = require("express");
const adminRouter = express.Router();
const Admincontroller = require("../Controllers/AdminController");
const middleware = require("../middlewares/Auth");
const facultyRouter = require("./Facultyroutes");

adminRouter.post(
  "/createfaculty",
  middleware.VerifyAdmin,
  Admincontroller.createfaculty
);

adminRouter.get(
  "/getfaculty",
  middleware.VerifyAdmin,
  Admincontroller.getFaculty
);

adminRouter.get(
  "/getStudentById",
  middleware.VerifyAdmin,
  Admincontroller.getStudentById
);

adminRouter.get(
  "/getFacultyById",
  middleware.VerifyAdmin,
  Admincontroller.getFacultyByDepartment
);

facultyRouter.put(
  "/updatestatus",
  middleware.VerifyAdmin,
  Admincontroller.ApproveAdmision
);

adminRouter.post(
  "/Adminlogin",
  middleware.VerifyAdmin,
  Admincontroller.Adminlogin
);

adminRouter.post(
  "/createDepartment",
  middleware.VerifyAdmin,
  Admincontroller.createDepartment
);

adminRouter.post(
  "/createCourse",
  middleware.VerifyAdmin,
  Admincontroller.createCourse
);

module.exports = adminRouter;
