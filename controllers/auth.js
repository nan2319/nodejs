'use strict'
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

var Usuarios = require('../models/usuarios');
var Sessions = require('../models/sessions');

var controller = {
    login: function(req, res){
      //validamos los datos que se envian al endpoint
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
      }

      let login_info = req.body;

      Usuarios.findOne({mail: login_info.mail, pass: login_info.pass}).exec( (err, usuario) =>
        {
            //mensaje de error
            if (err) return res.status(500).json({
                status: 500,
                mensaje: err
            });
            //mensaje si la tabla esta en blanco
            if (!usuario) return res.status(200).json({
                status: 200,
                mensaje: "Datos no validos"
            });

            //importar variables de token
            //constantes de configuracion
            const payload= {
                user_id: usuario.id
            };
            //se pone una llave para encriptar token
            const access_token =jwt.sign(payload,'RaAhv4i1ZxDoez3XXU0BmeLADtG27bd90jIrysJiGEQJJYbA7K', {
                expiresIn: '1d'
            } );

            //objeto de actualizacion
            let update= {
                user_id: usuario.id,
                jwt: access_token
            };

            Sessions.findOneAndUpdate({user_id: usuario.id}, update,{upsert: true, new:true }, (err, sessionsUpdate)=>{
                if(err) return res.status(500).send({message: err});
                if (!sessionsUpdate) return res.status(404).send({message: 'Datos erroneos'});
                
                return res.status(200).json({
                    status: 200,
                   message: "Autenticacion correcta",
                   token: access_token
                });
            });
            
           
        }); 
    },
    logout: function(req, res){
        Sessions.findOneAndRemove({user_id: req.decoded.user_id}, (err, sesionDeleted)=>{ 
            if (err) return res.status(500).send({message: err});
            if (!sesionDeleted) return res.status(404).send({message: 'Datos erroneos'});

            return res.status(200).send({
                message: 'Usuario salio'
            });
        })
    }

}
module.exports = controller;
