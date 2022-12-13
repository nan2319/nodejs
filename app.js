
const express = require('express');
const bodyParser = require('body-parser');

//importamos rutas
const routes= require('./routes/api');

const app = express();

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json({
    parameterLimit: 10000,
    limit: "50mb",
    extended: false
}));

app.use('', routes);

//exportamos
module.exports= app;