//Ruta para autenticar usuarios
const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController')
const {check}=require('express-validator');
const auth= require('../middleware/auth')

//iniciar sesion
// api/auth
router.post('/',authController.authUser);

module.exports=router;