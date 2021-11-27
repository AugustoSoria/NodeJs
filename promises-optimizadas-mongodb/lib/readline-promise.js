const readline = require('readline');
const _ = require('underscore')

let contadorDeIngresosFallidos = null

function leerStdInput({obj,nombre}, resolve, reject) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let pregunta = [
        'esta seguro que quiere insertar a MongoDB al usuario:',
        nombre,
        'responsa si/no: '].join(' ')

    rl.question(pregunta, (respuesta) => {
        if (respuesta === 'si' || respuesta === 'no') {
            resolve({
                obj,
                respuesta
            })
            rl.close()
            return
        }
        rl.close()
        contadorDeIngresosFallidos++
        if (contadorDeIngresosFallidos === 5) {
            return reject('Te zarpaste loro...')
        }
        _.defer(leerStdInput, {obj,nombre}, resolve, reject)
    });
}

function readLinePromise(objetoCompletoMasNombre) {
    contadorDeIngresosFallidos = 0
    return new Promise((resolve, reject)=>{
        leerStdInput(objetoCompletoMasNombre, resolve, reject)
    })
}

module.exports = readLinePromise
