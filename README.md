# NodeJs
Carpeta con ejercicios de Node Js y Mongo DB

fs.writefile -> Ejercicio en el que se generan mil archivos mediante un for asíncrono, a estos archivos con writeFile se les asigna un nombre y un cuerpo, esto proviene de la función crearObjetoFake, la cual usa el modulo faker y uuid, para generar un objeto de usuarios, el id del objeto faker se usa como nombre del archivo y el resto del objeto va en el cuerpo del archivo. Por cada iteración se llama a next para que el ciclo continúe y si hay un error se llama a abort, el cual para la iteración y el error se ve en el console.log de la línea 25.

collatz -> Ejercicio en el que se trata de usar la conjetura de collatz y la programación funcional para tratar de hacer funciones con nombre los más descriptivos posibles y que indiquen rápidamente para que sirve cada función, a su vez comprobando la conjetura y viendo que todos los números quedan bucleados en 1, 2 o 4.
