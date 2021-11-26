# NodeJs
Carpeta con ejercicios de Node Js y Mongo DB

fs.writefile -> Ejercicio en el que se generan mil archivos mediante un for asincrono, a estos archivos con writeFile se les asigna un nombre y un cuerpo, esto proviene de la funcion crearObjetoFake, la cual usa el modulo faker y uuid, para generar un objeto de usuarios, el id del objeto faker se usa como nombre del archivo y el resto del objeto va en el cuerpo del archivo. Por cada iteracion se llama a next para que el ciclo continue y si hay un error se llama a abort, el cual para la iteracion y el error se ve en el console.log de la linea 25.
