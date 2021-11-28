const express = require('express')
const MongoInterface = require('./lib/MongoInterface')
const genUsuario = require('./lib/genusuario')
const {RecursoAgregado, BadRequestError, NotFound, InternalServerError} = require('./lib/codigosHTTP')
const _ = require('underscore')
const usuarioMiddleware = require('./usuarioMiddleware')

const app = express()

let insert = _.partial(MongoInterface.insert,'baseusuarios', 'usuarios')
let query = _.partial(MongoInterface.query ,'baseusuarios', 'usuarios')
let update = _.partial(MongoInterface.update, 'baseusuarios', 'usuarios')
let erase = _.partial(MongoInterface.delete, 'baseusuarios', 'usuarios')


app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());

//middleware que cuenta la cantidad de hits a /api/usuario y cada 10 segundos lo resetea
app.use('/api/usuario', usuarioMiddleware)

app.use('/api/usuario', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})

app.get('/api/inventarusuario', (request, response) => {
    response.status(200).send(JSON.stringify(genUsuario()))
})

app.get('/api/usuario/:id', (request, response) => {
    // o bien, el usuario encontrado, o bien 404 NOT FOUND
    query({id:request.params.id}, (err, resultado) => {
        if (err) {
            return response.status(500).send(InternalServerError)
        }
        if (resultado.length < 1) {
            return response.status(404).send(NotFound)
        }
        response.status(200).send(resultado[0])
    })
})

app.get('/api/usuario/', (request, response) => {
    // ejemplo : localhost:3000/api/usuario/?firstName=Garett&city=East Aliberg
    let objQuery = {}

    if(request.query['firstName']) objQuery.firstName = request.query['firstName'];
    if(request.query['lastName']) objQuery.lastName = request.query['lastName'];
    if(request.query['city']) objQuery.city = request.query['city'];
    if(request.query['streetName']) objQuery.streetName = request.query['streetName'];
    if(request.query['country']) objQuery.country = request.query['country'];
    if(request.query['accountName']) objQuery.accountName = request.query['accountName'];
    if(request.query['account']) objQuery.account = request.query['account'];
    if(request.query['amount']) objQuery.amount = request.query['amount'];

    query(objQuery, (err, resultado) => {
        if (err) {
            return response.status(500).send(InternalServerError)
        }
        response.status(200).send(resultado)
    })
})

app.post('/api/usuario', (request, response) => {
    let obj = request.body

    insert(obj, (err) => {
        if (err) {
            return response.status(400).send(BadRequestError)
        }
    })
    response.status(201).send(RecursoAgregado)
})

app.put('/api/usuario/:id', (request, response) => {
    // No es posible modificar el id de base de datos.
    if(request.body._id) {
        response.status(400).end(JSON.stringify({Error: 'No es posible modificar el campo especificado.'}));
        return;
    }

    update(request.params.id, request.body, (err, resultado) => {
        if (err) {
            response.status(500).end(JSON.stringify({Error: 'Ha ocurrido un error interno.'}))
            return;
        }

        if (resultado.matchedCount < 1) {
            response.status(404).end(JSON.stringify({Error: 'El documento solicitado no existe.'}));
            return;
        }

        if (resultado.modifiedCount < 1) {
            response.status(200).end(JSON.stringify({Error: 'No se hicieron modificaciones al documento, puede ser que los valores insertados sean iguales.'}));
            return;
        }
        response.status(200).end(JSON.stringify({resultado: 'El usuario fue modificado.'}));
    })
})

app.delete('/api/usuario/:id', (request, response) => {
    erase({id: request.params.id}, (err, resultado) => {
        if (err) {
            response.status(500).end(JSON.stringify({Error: 'Ha ocurrido un error interno.'}))
            return;
        }

        if (resultado.matchedCount < 1) {
            response.status(404).end(JSON.stringify({Error: 'El documento solicitado no existe.'}));
            return;
        }

        response.status(200).end(JSON.stringify({resultado: 'usuario borrado'}));
    })
})

app.listen(3000, err => {
    console.log('escuchando el puerto 3000')
})