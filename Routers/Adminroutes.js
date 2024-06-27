const express = require('express');
const router = express.Router();
const {createfaculty,getfaculty,getStudentById,getFacultyById,Adminlogin}=require('../Controllers/AdminController');

router.post('/createfaculty',createfaculty);
router.get('/getfaculty',getfaculty);
router.get('/getStudentById',getStudentById);
router.get('/getFacultyById',getFacultyById);
router.post('/Adminlogin',Adminlogin);
router.post('/createDepartment',createDepartment);
router.post('/createCourse',createCourse);
