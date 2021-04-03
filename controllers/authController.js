const Usuario=require('../models/User');
const bcryptjs=require('bcryptjs');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.authUser= async (req,res)=>{
        //Revisar si hay errores
        const errores=validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        const{email,password}=req.body;

        try {
            let usuario=await Usuario.findOne({email});

            //Revisar que sea un usuario registrado
            if(!usuario){
                return res.status(400).json({msg:'El usuario no existe'});
            }

            //revisar el password
            const passCorrecto=await bcryptjs.compare(password,usuario.password);
            if(!passCorrecto){
                return res.status(400).json({msg:'Password Incorrecto'});
            }

            //si todo es correcto
            //crear y firmar el JWT
            const payload={
                usuario:{
                    id:usuario.id
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