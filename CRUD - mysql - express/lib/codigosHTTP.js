let strfy = z => JSON.stringify(z)

let RecursoAgregado = strfy({status: 201, desc: 'Recurso Agregado'})
let NotFound = strfy({status: 404, desc: 'Not Found'})
let InternalServerError = strfy({status: 500, desc: 'Internal server error'})

module.exports = {
    RecursoAgregado,
    NotFound,
    InternalServerError
}