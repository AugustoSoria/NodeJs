const genUsu = require('./lib/genusuario')
const asyncforloop = require('@arteysoft/asyncforloop')
const _ = require('underscore')
const fs = require('fs')

let genNomArch = id => ['/var','/usuarios/', id, '.json'].join('')

asyncforloop(1000, (nroIteracion, next, abort)=>{
    let objUsu = genUsu()
    let strUsu = JSON.stringify(objUsu)
    let nombreArch = genNomArch(objUsu.id)
    console.log(nombreArch)
    fs.writeFile(nombreArch, strUsu, 'utf8', err => {
        if (err) {
            abort(err)
            return
        }
        next()
    })
}, (err)=>{
    console.log(err)
    console.log('fin')
})
