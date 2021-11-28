
let strfy = z => JSON.stringify(z)


let RecursoAgregado = strfy({status: 201, desc: 'ok'})
let BadRequestError = strfy({status: 400, desc : 'Bad Request'})
let NotFound = strfy({status: 404, desc: 'Not Found'})
let InternalServerError = strfy({status: 500, desc: 'Internal server error'})

module.exports = {
    RecursoAgregado,
    BadRequestError,
    NotFound,
    InternalServerError
}