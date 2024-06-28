const express=require('express');
const studentRouter=express.Router();
const studentController=require('../Controllers/Studentcontroller');




studentRouter.post('/signup',studentController.Signup); 
studentRouter.get('/login',studentController.Login);
studentRouter.post('/adminsionrequest',studentController.RequesttoAdmision)

module.exports=studentRouter;