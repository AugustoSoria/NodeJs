# NodeJs
Carpeta con ejercicios de Node Js y Mongo DB

fs.writefile -> Ejercicio en el que se generan mil archivos mediante un for asíncrono, a estos archivos con writeFile se les asigna un nombre y un cuerpo, esto proviene de la función crearObjetoFake, la cual usa el modulo faker y uuid, para generar un objeto de usuarios, el id del objeto faker se usa como nombre del archivo y el resto del objeto va en el cuerpo del archivo. Por cada iteración se llama a next para que el ciclo continúe y si hay un error se llama a abort, el cual para la iteración y el error se ve en el console.log de la línea 25.

collatz -> Ejercicio en el que se trata de usar la conjetura de collatz y la programación funcional para tratar de hacer funciones con nombre los más descriptivos posibles y que indiquen rápidamente para que sirve cada función, a su vez comprobando la conjetura y viendo que todos los números quedan bucleados en 1, 2 o 4.

promises -> Ejercicio para practicar promises, se llama a readDirPromise la cual lee la carpeta del path y retorna los archivos que ahí se encuentran, estos archivos pasan a showIfDef para asegurarnos de que los archivos existan, después estos archivos se pasan a iterarPromise que con un for asíncrono muestra por un console.log el contenido de los archivos y luego estos archivos se van borrando con el removeFilePromise y el next, en caso de que hubiera un error se llama a abort y el error se mostrara en el console.log de la línea 63.

promises-optimizadas-mongodb -> Ejercicio de promises, se genera un readdir de la carpeta guardada en el path de la variable pathArchivos. Del array de archivos que devuelve readdir se usa su propiedad length como iterador, con el path de los archivos y su nombre unidos por / se obtiene su pathCompleto que se pasa a la función mostarContenido para que muestre el contenido de los archivos, este se pasa desde un partial application para no tener que repetir el callback para el caso en que haya un error, este callback es pasado por la función promisify que aparte se usa para no tener que escribir cada funcion como una promesa.
Promisify retorna el contenido de cada archivo, estos son pasados al then el cual los parsea para poner pasarlos a la función readLinePromise la cual básicamente si la respuesta es si o no llama a resolve y si no tiene un contador de intentos fallidos en donde si no se responde con si o con no cinco veces el programa termina.
ReadLinePromise retorna la respuesta y el contenido del archivo. Por último dependiendo de esta respuesta el archivo se sube o no a MongoDB el cual también es llamado con partial application para no tener que volver a escribir el callback, una vez terminado con mongo se pasa un then que llama a una función next para que el ciclo continúe.
En caso de un error este se va a mostrar en el console.log de la línea 111. Al final cada archivo pasa por shoIfDef para el caso de que el archivo no exista.

express - mongodb - middleware -> Ejercicio CRUD, donde se tiene una api que genera un json de usuario con el cual se puede practicar las peticiones get, post, delete y put y los codigos de error, tambien tiene un middleware que reicinia un contador te hits y otro que agrega una cabecera a cada response.

CRUD - mysql - express -> Ejemplo de CRUD con express y mysql2.
