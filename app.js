// const dato = require('./datos');
// dato('Hola mundo.');
// //console.log(module);

// const path = require('path');

// const objPath = path.parse(__filename);

// console.log(objPath.name);

// const os = require('os');

// var memoriaLibre = os.freemem();
// var memoriaTotal = os.totalmem();

// console.log(`Memoria libre: ${memoriaLibre}`);
// console.log(`Memoria total: ${memoriaTotal}`);


// const fs = require('fs');

// // const archivos = fs.readdirSync('./');
// // console.log(archivos);

// fs.readdir('./', function(err, files){
//     if(err) console.log('Error', err);
//     else console.log('Resultado', files);
// });

//Módulo de Eventos

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// //Registrar el Listener
// emitter.on('mensajeLoger', (arg) => {
//     console.log('Listener llamado...', arg);
// })

// //Registrar el evento
// emitter.emit('mensajeLoger', { id:1, url:'http://prueba.com' });

//Módulo HTTP

const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hola Mundo');
        res.end();
    }

    if(req.url === '/api/productos'){
        res.write(JSON.stringify(['mouse','teclado','parlante']));
        res.end();
    }
});

// server.on('connection', (puerto) => {
//     console.log('Nueva conexión...');
// })

server.listen(3000);

console.log('Servidor escuchando en el puerto 3000...');