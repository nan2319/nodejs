'use strict'
//controlador de rutas
var controller={
    //funciones de las rutas
    welcome: function(req, res){
        console.log("Get ejecutado en raiz");
        res.send("hola");
    },

    /*alumnos: function(req, res){
        res.send("Listado de alumnos");
    },

    alumno: function (req, res){
        let cal1=10;
        let cal2=9;
        let cal3=8;
        let cal=(cal1+cal2+cal3)/3
        //res.send("La calificacion es: "+ cal);

        //retorna un json
        return res.status(200).json({
            status: 200,
            final: cal,
        })
    },

    crear_alumno: (req, res) => {
        //console.log(req);  
        let user_info = req.body;
        
        console.log(user_info);
        
        //res.send("Creamos un alumno");

        return res.status(200).json({
            status: 200,
            nombre_alumno: user_info.nombre + " " + user_info.apellido,
            edad: user_info.edad

        });

        
    }*/

};

module.exports =controller;