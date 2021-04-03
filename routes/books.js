//Rutas de Books
const express=require('express');
const router=express.Router();
const bookController=require('../controllers/bookController')
const validator=require('express-joi-validation').createValidator({passError: true});
const schemas = require('../middleware/bookSchemas');
const auth = require('../middleware/auth');

// api/book

router.post('/',auth,validator.body(schemas.bodySchema),bookController.createBook);

router.get('/',auth,validator.body(schemas.querySchema),bookController.getBook);

router.get('/:id',auth,validator.params(schemas.paramsSchema),bookController.getBookId); 

router.put('/:id',auth,validator.params(schemas.paramsSchema),validator.body(schemas.bodySchema),bookController.updateBook);  

router.delete('/:id',auth,validator.params(schemas.paramsSchema),bookController.deleteBook);

module.exports=router;