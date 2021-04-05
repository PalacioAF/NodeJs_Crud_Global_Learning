const User=require('../models/User');
const bcryptjs=require('bcryptjs');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.authUser= async (req,res)=>{
        try {
            const{email,password}=req.body;

            let user=await User.findOne({email});

            //Revisar que sea un usuario registrado
            if(!user){
                return res.status(400).json({msg:'El usuario no existe'});
            }

            //revisar el password
            const passCorrect=await bcryptjs.compare(password,user.password);
            if(!passCorrect){
                return res.status(400).json({msg:'Password Incorrecto'});
            }

            //si todo es correcto
            //crear y firmar el JWT
            const payload={
                user:{
                    id:user.id
                }
            }

            //firmar el JWT
            jwt.sign(payload,process.env.SECRET,{
                expiresIn:3600
            },(error,token)=>{
                if(error) throw error;

                //Mensaje
                res.json({msg:'OK',token});
            }
            )
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'Hubo un error'});
        }

}