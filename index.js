const express = require('express');
const app = express();

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arreglo de prueba
const usuarios = [
    {id: 1, nombre: 'Lucas'},
    {id: 2, nombre: 'Carmelo'},
    {id: 3, nombre: 'Paula'}
]

// Hello World
app.get('/', (req, res) => {
    res.send('Hello World by Express');
});

// Mostrar Arreglo
app.get('/api/usuarios', (req, res) => {
    res.send(usuarios);
});

// Filtrando por id
app.get('/api/usuarios/:id', (req, res) => {
    let usuario = usuarios.find(user => user.id === Number(req.params.id));
    if(!usuario){
        res.status(404).send('404: Usuario no encontrado');
    } else {
        res.send(usuario);
    }
});

// 
app.post('/api/usuarios', (req, res) => {

    if(!req.body.nombre || !isNaN(req.body.nombre)){
        // 400 Bad Request
        res.status(400).send('Debe ingresar un nombre válido');
        return;
    }

    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    };

    usuarios.push(usuario);
    res.send(usuario);
});


// Definicion puerto y arranque de servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}.`);
});

