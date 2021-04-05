//Auth Route
const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController')

//Login
// api/auth
router.post('/',authController.authUser);

module.exports=router;