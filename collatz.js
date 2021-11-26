/*
La premisa o conjetura es que cualquier número
aplicando este algoritmo
si es par ? lo divido x 2 recursivamente
es es impar le aplico 3n+1
La conjetura dice que cualquier numero queda bucleando
en 4 2 1
*/

let siEsPar = z =>  {
    if(z % 2 === 0){
        z = z / 2
    }
    return z
}

let siEsImpar = z => {
    if(z % 2 !== 0){
        z = ((z * 3) + 1)
    }
    return z
}

let bucleado = z => {
    if(z === 1 ){
        return true
    }
    if(z === 2){
        return true
    }
    if(z === 4){
        return true
    }
    return false
}

let collatz = (z,agregar) => {
    while(!bucleado(z)){
        agregar(z)
        z = siEsPar(z)
        agregar(z)
        z = siEsImpar(z)
    }
    agregar(z)
    return z
}

{
    let recorrido = []
    let agregar = z => {
        if((recorrido.indexOf(z)) === -1){
            recorrido.push(z)
        }
    }
    collatz(9e+100, agregar)
    recorrido.map(n => console.log(n))
}