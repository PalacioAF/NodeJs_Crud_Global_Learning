const express=require('express');
const conectarDB=require('./config/db');
const cors=require('cors');

//crear servidor
const app=express();

//conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended:true}));

//Puerto
const port=process.env.PORT ||5000;

//Importar Rutas
app.use('/api/login',require('./routes/auth'));
app.use('/api/user',require('./routes/users'));
app.use('/api/book',require('./routes/books'));

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      res.status(400).json({
        type: err.type, 
        message: err.error.toString()
      });
    } else {
      next(err);
    }
  });

//Arrancar
app.listen(port,'0.0.0.0',()=>{
    console.log('Bienvenido AFPalacio');
});