const express = require('express');
const adminRouter = express.Router();
const Admincontroller=require('../Controllers/AdminController');
const helper=require("../Helper/common");
const middleware=require("../middlewares/Auth")



adminRouter.post('/createfaculty',Admincontroller.createfaculty);
adminRouter.get('/getfaculty',Admincontroller.getfaculty);

adminRouter.get('/getStudentById',Admincontroller.getStudentById);
adminRouter.get('/getFacultyById',Admincontroller.getFacultyByDepartment);

adminRouter.post('/Adminlogin', middleware.VerifyAdmin,Admincontroller.Adminlogin);
adminRouter.post('/createDepartment',Admincontroller.createDepartment);
adminRouter.post('/createCourse',Admincontroller.createCourse);

module.exports=adminRouter;