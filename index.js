const express = require('express');
const Joi = require('joi');
const app = express();

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('404: Usuario no encontrado');
    } else {
        res.send(usuario);
    }
});

// Agregando Usuario
app.post('/api/usuarios', (req, res) => {

    // Validando...
    const {error, value} = validarUsuario(req.params.body);

    // Si pasa validacion suma usuario al arreglo principal
    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            nombre: value.nombre
        };
    
        usuarios.push(usuario);
        res.send(usuario);
    } else {
        const mensajeError = error.details[0].message;
        res.status(400).send(mensajeError);
    }
});

// Editando Usuario
app.put('/api/usuarios/:id', (req, res) => {
    // Encontrar si existe usuario a modificar
    let usuario = usuarios.find(user => user.id === Number(req.params.id));
    if(!usuario){
        res.status(404).send('404: Usuario no encontrado');
        return;
    }

    // Validando...
    const {error, value} = validarUsuario(req.body.nombre);

    if(error){
        const mensajeError = error.details[0].message;
        res.status(400).send(mensajeError);
        return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);
});

// Eliminar Usuario
app.delete('/api/usuarios/:id', (req, res) => {
    // Encontrar si existe usuario a modificar
    let usuario = usuarios.find(user => user.id === Number(req.params.id));
    if(!usuario){
        res.status(404).send('404: Usuario no encontrado');
        return;
    }

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);

    res.send(usuarios);
});

// Definicion puerto y arranque de servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}.`);
});

const existeUsuario = (id) => {
    return usuarios.find(user => user.id === Number(id));
}

const validarUsuario = (nom) => {
    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .required()
    });

    return (schema.validate({nombre: nom}));
}

