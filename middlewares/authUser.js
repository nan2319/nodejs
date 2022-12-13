'use strict'

const jwt = require('jsonwebtoken');
const middlewares = {
    userProtectUrl: function(req, res, next){
        const token= req.headers['access-token'];

        //validando token
        //el token va a ser valido durante 24hrs
        if(token){
            jwt.verify(token, 'RaAhv4i1ZxDoez3XXU0BmeLADtG27bd90jIrysJiGEQJJYbA7K', (err, decoded)=>{
                if(err){
                    return res.status(403).json({message: "Token invalido"})
                }else {
                    req.decoded = decoded;

                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session)=>{

                        //validacion si se hay error de conexion
                        if(err) return res.status(500).send({message: ' Error al devolverlos datos'});
                        //validacion si se meten datos que no son validos
                        if (!session) return res.status(404).send({message: "Los datos de autenticacion no son validos"});
                        
                    })
                    //next le dice que continua despues de validar que el token es correcto
                    next();
                }
            })
        }else{
            res.status(403).send({
                message: "Token no valido"
            });
        }
    }
};

module.exports = middlewares;