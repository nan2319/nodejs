'use stict'

const {validationResult} = require('express-validator');

//se importa controlador de alumnos de modelos
var Alumnos = require('../models/alumnos');

//controlador con metodos
var controller = {
    alumnos: function(req, res){
        //funcion de busqueda
        Alumnos.find({}).exec( (err, alumnos) =>
        {
            //mensaje de error
            if (err) return res.status(500).json({
                status: 500,
                mensaje: err
            });
            //mensaje si la tabla esta en blanco
            if (!alumnos) return res.status(200).json({
                status: 200,
                mensaje: "No hay alumnos por listar"
            });
            
            return res.status(200).json({
                status: 200,
                data: alumnos
            });
        }); 
    },
    alumno: function(req, res){
        let n_lista = req.params.n_lista;

        //se imprime numero de cuenta tomado de params
        //console.log(n_lista);



        //funcion de busqueda por numero de cuenta
        Alumnos.findOne({n_cuenta: n_lista}).exec( (err, alumno) =>
        {
            //mensaje de error
            if (err) return res.status(500).json({
                status: 500,
                mensaje: err
            });
            //mensaje si la tabla esta en blanco
            if (!alumno) return res.status(200).json({
                status: 200,
                mensaje: "No hay alumnos por listar"
            });
            
            return res.status(200).json({
                status: 200,
                data: alumno
            });
        }); 
    },
    //funcion crear alumno
    crear_alumno: function(req, res){
        //validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        let user_info = req.body;

        Alumnos.findOne({n_cuenta: user_info.n_cuenta}).exec( (err, alumno) =>
        {
            //mensaje de error
            if (err) return res.status(500).json({status: 500,mensaje: err});
            //mensaje si la tabla esta en blanco
            if (alumno) return res.status(200).json({status: 200, mensaje: "El numero de id ya existe"});

            //modelo de insert
            var alumnos_model = new Alumnos();
            alumnos_model.n_cuenta = user_info.n_cuenta;
            alumnos_model.nombre = user_info.nombre;
            alumnos_model.edad = user_info.edad;
            

            alumnos_model.save((err, alumnoStored) => {
               //mensaje de error
               if (err) return res.status(500).json({
                status: 500,
                mensaje: err
                });
                //mensaje si la tabla esta en blanco
                if (!alumnoStored) return res.status(200).json({
                status: 200,
                mensaje: "No se guardo el alumno"
                });

                return res.status(200).json({
                status: 200,
                message: "Usuario almacenado"
                });
            });
        });
    },
    //funcion actualizar alumno
    update_alumno(req, res){
        //validamos los datos que se envian al endpoint
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        let n_lista = req.params.n_lista;
        let user_info = req.body;

        let alumno_info_update = {
            nombre: user_info.nombre,
            edad: user_info.edad,
        }

        Alumnos.findOneAndUpdate({n_cuenta: n_lista}, alumno_info_update, {new:true}, (err, alumnoUpdate) => {
            if (err) return res.status(500).json({message: "Error al actualizar"});
            if(!alumnoUpdate) return res.status(404).json({message: "No existe el alumno"});

            return res.status(200).json({
                nombre: alumnoUpdate.nombre,
                edad: alumnoUpdate.edad,
            });
        });
    },
    delete_alumno: function (req, res){
        let n_lista = req.params.n_lista;

        Alumnos.findOneAndDelete({n_cuenta: n_lista}, (err, alumnoDelete)=>{
            if (err) return res.status(500).json({message: "Error al eliminar"});
            if(!alumnoDelete) return res.status(404).json({message: "No existe el alumno"});

            return res.status(200).json({
                message: "Usuario eliminado"})
        });
    }
};

module.exports = controller;