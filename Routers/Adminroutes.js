const express = require("express");
const adminRouter = express.Router();
const Admincontroller = require("../Controllers/AdminController");
const middleware = require("../middlewares/Auth");
const facultyRouter = require("./Facultyroutes");

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

module.exports = adminRouter;
