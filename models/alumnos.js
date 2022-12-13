'use strict'
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var AlumnosSchema= Schema({
    n_cuenta: {type: Number, require:true, unique: true},
    nombre: {type: String, require: true},
    edad: {type: String, require:true},
});

//se exporta el esquema a la bd creada en mongodb
module.exports= mongoose.model('alumnos', AlumnosSchema);