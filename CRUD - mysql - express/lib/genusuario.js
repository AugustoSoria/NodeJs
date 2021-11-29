const faker = require('faker');
const uuid = require('uuid');

function crearObjetoFake() {
    return {
        id : uuid.v4(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        city: faker.address.city()
    }
}

module.exports = crearObjetoFake;