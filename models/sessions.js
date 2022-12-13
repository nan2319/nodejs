'use strict'
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var UsessionSchema= Schema({
    user_id: {type: String, require:true, unique: true},
    jwt: {type: String, require: true},
});

//se exporta el esquema a la bd creada en mongodb
module.exports= mongoose.model('sessions', UsessionSchema);