const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Arreglo de prueba
const usuarios = [
    {id: 1, nombre: 'Lucas'},
    {id: 2, nombre: 'Carmelo'},
    {id: 3, nombre: 'Paula'}
]

// Mostrar Arreglo
router.get('/api/usuarios', (req, res) => {
    res.send(usuarios);
});

// Filtrando por id
router.get('/api/usuarios/:id', (req, res) => {
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('404: Usuario no encontrado');
    } else {
        res.send(usuario);
    }
});

// Agregando Usuario
router.post('/api/usuarios', (req, res) => {
    // Validando...
    const {error, value} = validarUsuario(req.body.nombre);
    

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
router.put('/api/usuarios/:id', (req, res) => {
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
router.delete('/api/usuarios/:id', (req, res) => {
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

module.exports = router;