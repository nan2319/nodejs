'use strict'

//importamos mongoose para ponder conectar a mongodb
const mongoose = require ('mongoose');

//importamos app
const app =require('./app');
const port = 3700;

//una promesa global para conectar a la bd
mongoose.Promise = global.Promise;

//conexion a la bd
mongoose.connect('mongodb://localhost:27017/curso', { useNewUrlParser: true, useUnifiedTopology: true}).then( ()=>{
    console.log("Conexion a ala base de datos establecida con exito");

    //conexion a servidor 
    var server = app.listen(port, ()=>{
        console.log("Servidor corriendo correctamente en la url: http://localhost: "+port); 
    });
})
.catch(err => console.log(err));


