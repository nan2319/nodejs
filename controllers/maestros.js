'use stict'

const {validationResult} = require('express-validator');

//se importa controlador de alumnos de modelos
var Maestros = require('../models/maestros');

//controlador con metodos
var controller = {
    maestros: function(req, res){
        //funcion de busqueda
        Maestros.find({}).exec( (err, maestros) =>
        {
            //mensaje de error
            if (err) return res.status(500).json({
                status: 500,
                mensaje: err
            });
            //mensaje si la tabla esta en blanco
            if (!maestros) return res.status(200).json({
                status: 200,
                mensaje: "No hay maestros por listar"
            });
            
            return res.status(200).json({
                status: 200,
                data: maestros
            });
        }); 
    },
    maestro: function(req, res){
        let n_id = req.params.n_id;

        //funcion de busqueda por numero de id
        Maestros.findOne({n_id: n_id}).exec( (err, maestro) =>
        {
            //mensaje de error
            if (err) return res.status(500).json({
                status: 500,
                mensaje: err
            });
            //mensaje si la tabla esta en blanco
            if (!maestro) return res.status(200).json({
                status: 200,
                mensaje: "No hay maestros por listar"
            });
            
            return res.status(200).json({
                status: 200,
                data: maestro
            });
        }); 
    },
    //funcion crear maestro
    crear_maestro: function(req, res){
        //validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        let user_info = req.body;

        Maestros.findOne({n_id: user_info.n_id}).exec( (err, maestro) =>
        {
            //mensaje de error
            if (err) return res.status(500).json({status: 500,mensaje: err});
            //mensaje si la tabla esta en blanco
            if (maestro) return res.status(200).json({status: 200, mensaje: "El numero de id ya existe"});

            //modelo de insert
            var maestros_model = new Maestros();
            maestros_model.n_id = user_info.n_id;
            maestros_model.nombre = user_info.nombre;
            maestros_model.materia = user_info.materia;
            

            maestros_model.save((err, maestroStored) => {
               //mensaje de error
               if (err) return res.status(500).json({
                status: 500,
                mensaje: err
                });
                //mensaje si la tabla esta en blanco
                if (!maestroStored) return res.status(200).json({
                status: 200,
                mensaje: "No se guardo el maestro"
                });

                return res.status(200).json({
                status: 200,
                message: "Usuario almacenado"
                });
            });
        });
    },

    //funcion actualizar maestro
    update_maestro(req, res){
        //validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        let n_id = req.params.n_id;
        let user_info = req.body;

        let maestro_info_update = {
            nombre: user_info.nombre,
            materia: user_info.materia,
        }

        Maestros.findOneAndUpdate({n_id: n_id}, maestro_info_update, {new:true}, (err, maestroUpdate) => {
            if (err) return res.status(500).json({message: "Error al actualizar"});
            if(!maestroUpdate) return res.status(404).json({message: "No existe el maestro"});

            return res.status(200).json({
                nombre: maestroUpdate.nombre,
                materia: maestroUpdate.materia,
            });
        });
    },
    delete_maestro: function (req, res){
        let n_id = req.params.n_id;

        Maestros.findOneAndDelete({n_id: n_id}, (err, maestroDelete)=>{
            if (err) return res.status(500).json({message: "Error al eliminar"});
            if(!maestroDelete) return res.status(404).json({message: "No existe el maestro"});

            return res.status(200).json({
                message: "Usuario eliminado"})
        });
    }
};

module.exports = controller;