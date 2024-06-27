const express=require('express');
const router=express.Router();
const studentController=require('../Controllers/Studentcontroller');




router.post('/signup',studentController.Signup); 
router.get('/login',studentController.Login);