//Ruta para crear usuarios
const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController')
const validator=require('express-joi-validation').createValidator({passError: true});
const schemas = require('../middleware/userSchemas');
const auth = require('../middleware/auth');

// api/usuarios

router.post('/',auth,validator.body(schemas.bodySchema),userController.createUser);

router.get('/',auth,validator.body(schemas.querySchema),userController.getUser);

router.get('/:id',auth,validator.params(schemas.paramsSchema),userController.getUserId);   

router.put('/:id',auth,validator.params(schemas.paramsSchema),validator.body(schemas.bodySchema), userController.updateUser);

router.delete('/:id',auth,validator.params(schemas.paramsSchema),userController.deleteUser);  

module.exports=router;