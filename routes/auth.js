//Auth Route
const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController')
const validator=require('express-joi-validation').createValidator({passError: true});
const schemas = require('../middleware/authSchemas');

//Login
// api/auth
router.post('/',validator.body(schemas.bodySchema),authController.authUser);

module.exports=router;