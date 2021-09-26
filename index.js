const inicioDebug = require('debug')('app:inicio');
const dbDebug = require('debug')('app:db');
const express = require('express');
const config = require('config');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router');

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', router);

// Config Entorno
// $env:NODE_ENV="entorno"
console.log('App: ' + config.get('nombre'));
console.log('Base de datos: ' + config.get('config-db.host'));
<<<<<<< HEAD

// Verif Entorno
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    inicioDebug('Morgan Habilitado');
}

dbDebug('Conectando base de datos');


=======

// Verif Entorno
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    inicioDebug('Morgan Habilitado');
}

dbDebug('Conectando base de datos');


>>>>>>> db3c9d866eff7a9f78878af6ea9d595761294cfe
// Hello World
app.get('/', (req, res) => {
    res.send('Hello World by Express');
});



// Definicion puerto y arranque de servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}.`);
<<<<<<< HEAD
});
=======
});


>>>>>>> db3c9d866eff7a9f78878af6ea9d595761294cfe
