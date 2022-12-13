'use strict'

//modelo de usuarios para crear token
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var UsuariosSchema= Schema({
    mail: {type: String, require:true, unique: true},
    pass: {type: String, require: true},
    
});

//se exporta el esquema a la bd creada en mongodb
module.exports= mongoose.model('usuarios', UsuariosSchema);