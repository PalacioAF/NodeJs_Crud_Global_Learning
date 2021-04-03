//Ruta para crear usuarios
const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController')
const {check}=require('express-validator');

//Crear un usuario
// api/usuarios
router.post('/',userController.createUser);

router.get('/',userController.getUser);

router.get('/id/:id',userController.getUserId);   

router.get('/UserName/',userController.getUserUserName);  

router.put('/:id', userController.updateUser);

router.delete('/:id',userController.deleteUser);  

module.exports=router;