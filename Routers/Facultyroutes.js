const facultycontroller = require("../Controllers/Facultycontroller");
const express = require("express");
const facultyRouter = express.Router();
const middleware = require("../middlewares/Auth");

facultyRouter.post("/login", middleware.verifyFaculty, facultycontroller.login);

facultyRouter.put(
  "/ApproveStudentAdmision",
  middleware.verifyFaculty,
  facultycontroller.ApproveStudentAdmision
);

facultyRouter.put(
  "/updateprofile",
  middleware.verifyFaculty,
  facultycontroller.updateProfile
);

module.exports = facultyRouter;
