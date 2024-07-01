const facultycontroller = require("../Controllers/Facultycontroller");
const express = require("express");
const facultyRouter = express.Router();
const middleware = require("../middlewares/Auth");
const FaqController = require("../Controllers/FaqController");

facultyRouter.post("/login", middleware.verifyFaculty, facultycontroller.login);

facultyRouter.put(
  "/ApproveStudentAdmision",
  middleware.verifyFaculty,
  facultycontroller.ApproveStudentAdmision
);

facultyRouter.put("/updateprofile",middleware.verifyFaculty,facultycontroller.updateProfile
);

facultyRouter.post("/addfaq", middleware.verifyFaculty, FaqController.addfaq);
facultyRouter.get("/getfaq", middleware.verifyFaculty, FaqController.Getfaq);
facultyRouter.put(
  "/updatefaq",
  middleware.verifyFaculty,
  FaqController.updatefaq
);
facultyRouter.delete(
  "/deletefaq",
  middleware.verifyFaculty,
  FaqController.Deletefaq
);
module.exports = facultyRouter;
