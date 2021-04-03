const User=require('../models/User');
const bcryptjs=require('bcryptjs');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.createUser=async (req,res)=>{

    //Revisar si hay errores
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {firstName,lastName,email,password,address,phone}=req.body;
    const nuevoUsuario={};

    try {
        let user=await User.findOne({email});

        if(user){
            return res.status(400).json({msg:'El usuario ya existe'});
        }
    
        if(firstName){
            nuevoUsuario.firstName=firstName;
        }
    
        if(lastName){
            nuevoUsuario.lastName=lastName;
        }

        nuevoUsuario.userName=lastName.charAt(0).toUpperCase() + firstName;
    
        if(email){
            nuevoUsuario.email=email;
        }
    
        if(password){
            //Hashear el password
            const salt=await bcryptjs.genSalt(10);
            nuevoUsuario.password=await bcryptjs.hash(password,salt);
        }
    
        if(address){
            nuevoUsuario.address=address;
        }
    
        if(phone){
            nuevoUsuario.phone=phone;
        }
    

        //crea el nuevo usuario
        user=new User(nuevoUsuario);


        //guarda usuario
        await user.save();

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
            res.json({user,msg:'Usuario creado correctamente',token});
        }
        )
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
    
}


exports.getUser = async (req, res) => {
    try {

        // Obtener las tareas por proyecto
        const users = await User.find({});
        res.json({ users });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getUserId = async (req, res) => {
    try {
        // Obtener usuario por id
        const user = await User.findById(req.params.id);
        res.json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getUserUserName = async (req, res) => {
    try {
        // Obtener usuario por userName
        const { userName } = req.query;
        const user = await User.find({userName:userName});
        res.json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.updateUser=async (req,res)=>{
    //Revisar si hay errores
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    const {firstName,lastName,email,password,address,phone}=req.body;
    const nuevoUsuario={};

    if(firstName){
        nuevoUsuario.firstName=firstName;
    }

    if(lastName){
        nuevoUsuario.lastName=lastName;
    }

    if(email){
        nuevoUsuario.email=email;
    }

    if(password){
        //Hashear el password
        const salt=await bcryptjs.genSalt(10);
        nuevoUsuario.password=await bcryptjs.hash(password,salt);
    }

    if(address){
        nuevoUsuario.address=address;
    }

    if(phone){
        nuevoUsuario.phone=phone;
    }


    try {

        let user = await User.findById(req.params.id);

        // si el proyecto existe o no
        if(!user) {
            return res.status(404).json({msg: 'Usuario no encontrado'})
        }

        // actualizar
        user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set : nuevoUsuario}, { new: true });

        res.json({user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}

exports.deleteUser = async (req, res ) => {
    try {
        // revisar el ID 
        let user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({msg: 'Usuario no encontrado'})
        }


        await User.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Usuario eliminado'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}