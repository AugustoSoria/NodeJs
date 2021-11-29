const express = require('express')
const genUsuario = require('./lib/genusuario')
const {RecursoAgregado, NotFound, InternalServerError} = require('./lib/codigosHTTP')
const mysql2 = require('mysql2');

const app = express()

app.set('port', process.env.PORT || 3002)
app.use(express.json())

let connection = mysql2.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'crudnodejsmysql'
});

app.get('/api/inventarusuario', (request, response) => {
    response.status(200).send(JSON.stringify(genUsuario()))
})

app.get('/api/usuarios', (request, response) => {
    connection.query('SELECT * FROM usuarios', (error, usuarios) => {
        if (error) {
            console.log(error);
            response.status(500).send(InternalServerError);
            return;
        }

        response.status(200).send(usuarios);
    });
    
})

app.get('/api/usuarios/:id', (request, response) => {
    let {id} = request.params;
    connection.query("SELECT * FROM usuarios WHERE id = ?", [id], (error, usuarios) => {
        if (error) {
            console.log(error);
            response.status(500).send(InternalServerError);
            return;
        }

        if (usuarios.length < 1) {
            response.status(404).send(NotFound);
            return;
        }

        response.status(200).send(usuarios);
    });
    
})

app.post('/api/usuarios', (request, response) => {
    const data = request.body;
    connection.query('INSERT INTO usuarios set ?', data, (error, usuarios) => {
        if (error) {
            console.log(error);
            response.status(500).send(InternalServerError);
            return;
        }

        response.status(201).send(RecursoAgregado);
    });
    
})

app.put('/api/usuarios/:id', (request, response) => {
    const {id} = request.params;
    const nuevoUsu = request.body;
    connection.query('UPDATE usuarios set ? where id = ?', [nuevoUsu, id], (error, usuarios,fields) => {
        if (error) {
            console.log(error);
            response.status(500).send(InternalServerError);
            return;
        }

        if (usuarios.affectedRows < 1) {
            response.status(404).send(NotFound);
            return;
        }

        if (usuarios.changedRows < 1) {
            response.status(200).send(JSON.stringify({Error: 'No se hicieron modificaciones al documento, puede ser que los valores insertados sean iguales.'}));
            return;
        }

        response.status(201).send(usuarios);
    });
    
})

app.delete('/api/usuarios/:id', (request, response) => {
    let { id } = request.params;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, usuarios) => {
        if (error) {
            console.log(error);
            response.status(500).send(InternalServerError);
            return;
        }
        if (usuarios.affectedRows < 1) {
            response.status(404).send(NotFound);
            return;
        }

        response.status(200).send(JSON.stringify({Error: 'Archivo eliminado'}));
    });
    
})

app.listen(app.get('port'), () => {
    console.log('server en puerto',app.get('port'));
});