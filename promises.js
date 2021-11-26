const asyncforloop = require('@arteysoft/asyncforloop')
const _ = require('underscore')
const fs = require('fs')

let showIfDef = z => {
    if (z===undefined)
        return
    if (z===null)
        return

    console.log(z)
}

let path = ['/var','/usuarios/'].join('')

function readDirPromise() {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(files)
        })
    })
}

function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8' , (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

let removeFilePromise = (pathfile) => {
    return new Promise((resolve,reject) => {
        fs.unlink(pathfile, (err) => {
            if (err) {
                reject(err)
                return
            }
            resolve("Archivo " + pathfile + " eliminado")
        })
    })
}

let iterarPromise = (files) => {
    asyncforloop(files.length, (nroIteracion, next, abort)=>{
        let path = ['/var','/usuarios/'].join('')
        let file = files[nroIteracion]
        readFilePromise(path+file)
        .then(z => console.log(z))
        .then(() => removeFilePromise(path+file))
        .then(next)
        .catch(abort)
    }, (err)=>{
        console.log(err)
        console.log('fin')
    })
}

readDirPromise()
.then(arrFiles => { arrFiles.forEach(showIfDef); return arrFiles } )
.then(z => z)
.then(iterarPromise)
.catch(e => {
    showIfDef(e)
})