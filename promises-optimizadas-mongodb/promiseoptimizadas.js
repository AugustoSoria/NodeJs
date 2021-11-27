
const asyncforloop = require('@arteysoft/asyncforloop')
const _ = require('underscore')
const fs = require('fs')
const promisify = require('./lib/promisify')
const readLinePromise = require('./lib/readline-promise')
const mongoDriver = require('./lib/MongoInterface')

let showIfDef = z => {
    if (z===undefined)
        return
    if (z===null)
        return

    console.log(z)
}

let pathArchivos = '/var/usuarios'

let mostrarContenido = (path, next) => {
    fs.readFile(path, 'utf8', (err, contenido) => {
        if (err) {
            showIfDef(err)
            return
        }
        console.log(contenido)
        console.log('-----------------------------------------')
        next(undefined, contenido)
    })
}

let insertarMongo = (doc, onFinish) => {
    mongoDriver.insert('basedef', 'usuarios', doc, (err)=>{
        if (err) {
            console.log(err)
            onFinish(err)
            return
        }
        onFinish(undefined)
    })
}

fs.readdir(pathArchivos, (err, files) => {
    let cantArchivos = files.length
    asyncforloop(cantArchivos, (nroIteracion, next, abort) => {
        let nombreArch = files[nroIteracion]
        let pathCompleto = [pathArchivos, nombreArch].join('/')
        console.log('-----------------------------------------')
        console.log('Iteracion nro: ' + nroIteracion)
        console.log('-----------------------------------------')
        promisify(_.partial(mostrarContenido, pathCompleto))
        .then(data => {
            let obj = JSON.parse(data)
            return readLinePromise({ obj, nombre: obj.firstName })
        })

        .then(({respuesta, obj}) => {
            let objInsertar = obj
            console.log(objInsertar)
            if (respuesta === 'si') {
                return promisify(_.partial(insertarMongo, objInsertar))
            }
            return 
        })
        .then(() => {
            next()
        })
        .catch(err => {
            console.log('se produjo un error')
            console.log(err)
        })
    }, showIfDef)
})

