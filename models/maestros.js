'use strict'

//modelo de usuarios para crear token
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var MaestroSchema= Schema({
    n_id: {type: Number, require:true, unique: true},
    nombre: {type: String, require:true, unique: true},
    materia: {type: String, require: true},
    
});

//se exporta el esquema a la bd creada en mongodb
module.exports= mongoose.model('maestros', MaestroSchema);