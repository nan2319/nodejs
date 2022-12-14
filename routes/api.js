const express=require('express');


const {body} = require('express-validator');

//aqui estan las rutas
const api= express.Router();
//se importa controlador de funciones rutas
var WelcomeController=require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnos');
var MaestrosController = require('../controllers/maestros');
let AuthController =require('../controllers/auth');

//aqui se manda a llamar el middleware
let userProtectUrl = require ('../middlewares/authUser').userProtectUrl;

api.get ('/', WelcomeController.welcome);

//endpoint alumnos
//muestra todos los alumnos
api.get('/alumnos', AlumnosController.alumnos);

//muesta por numero de cuenta
api.get('/alumno/:n_lista', AlumnosController.alumno);

//metodo para crear post
api.post('/alumno', userProtectUrl,[
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    
], AlumnosController.crear_alumno);

//metodo para actualizar put
api.put('/alumno/:n_lista',[
    //body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    
], AlumnosController.update_alumno);

//metodo para eliminar delete
api.delete('/alumno/:n_lista',AlumnosController.delete_alumno);

//endpoint de usuarios login
api.post("/login",[
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty(),
], AuthController.login);

//endpoint de usuario logout
api.post("/logout",userProtectUrl, AuthController.logout);

//endpoint maestros
//muestra todos los maestros
api.get('/maestros', MaestrosController.maestros);

//muesta por numero de id
api.get('/maestro/:n_id', MaestrosController.maestro);

//metodo para crear post
api.post('/maestro', userProtectUrl,[
    body('n_id').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('materia').not().isEmpty(),
    
], MaestrosController.crear_maestro);

//metodo para actualizar put
api.put('/maestro/:n_id',[
    //body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('materia').not().isEmpty(),
    
], MaestrosController.update_maestro);

//metodo para eliminar delete
api.delete('/maestro/:n_id',MaestrosController.delete_maestro);

module.exports=api;

