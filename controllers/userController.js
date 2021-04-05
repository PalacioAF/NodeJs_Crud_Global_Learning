const User=require('../models/User');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.createUser=async (req,res)=>{
    try {
        const {firstName,lastName,email,password,address,phone}=req.body;
        const newUser={};

        let user=await User.findOne({email});

        if(user){
            return res.status(400).json({msg:'El usuario ya existe'});
        }
    
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.userName=firstName.charAt(0).toUpperCase() +  lastName;
        newUser.email=email;
        //Hashear el password
        const salt=await bcryptjs.genSalt(10);
        newUser.password=await bcryptjs.hash(password,salt);
        newUser.address=address;
        newUser.phone=phone;
        
        //crea el nuevo usuario
        user=new User(newUser);

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
        res.status(500).json({msg:'Hubo un error'});
    }
    
}

exports.getUser = async (req, res) => {
    try {
        // Obtener los usuarios
        const users = await User.find(req.query);
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

exports.updateUser=async (req,res)=>{
    try {
        let user=await User.findById(req.params.id);

        if(!user){
            return res.status(400).json({msg:'Usuario no encontrado'});
        }

        const {firstName,lastName,userName,email,password,address,phone}=req.body;
        const newUser={};
    
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.userName=userName;
        newUser.email=email;
        //Hashear el password
        const salt=await bcryptjs.genSalt(10);
        newUser.password=await bcryptjs.hash(password,salt);
        newUser.address=address;
        newUser.phone=phone;

        // actualizar
        user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set : newUser}, { new: true });

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