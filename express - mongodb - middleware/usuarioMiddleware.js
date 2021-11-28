let contador = 0

let resetContador = () => {
    setTimeout( () => {
        contador = 0
    }, 10000);
}


function usuarioMiddleware(req, res, next) {
    console.log(contador++)
    resetContador()
    next()
}

module.exports = usuarioMiddleware