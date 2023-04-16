# Práctica 10

## Los github Actions están funcionando a la perfección.

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-edurguezsb/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-edurguezsb?branch=master)

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-edurguezsb)


En esta actividad, la Práctica 10 de la asignatura, se nos plantean realizar una serie de ejercicios, y también a mejorar la aplicación de Funkos que habíamos desarrollado en la práctica anterior. También, al igual que llevamos haciendo en prácticas anteriores hasta ahora, a parte de llevar a cabo una buena estructura y organización de ficheros y directorios, no debemos olvidarnos de utilizar los principios SOLID,sus pruebas TDD o BDD para confirmar el correcto funcionamiento del código desarrollado, todo el código con comentarios tipo TypeDoc, cubrimiento de código con Istanbul y Coveralls, Sonar Cloud para analizar la calidad, y los github actions.

Los objetivos de esta práctica son seguir familiarizándonos con el manejo de las herramientas mencionadas anteriormente ya que son bastante fundamentales a la hora de realizar un proyecto en TypeScript para asegurarnos de que nuestra solución es buena, y que serán necesarios para el correcto desarrollo y avance en la asignatura de Desarrollo de Sistemas Informáticos que próximamente en 2 o 3 prácticas más llegará a su fin.


También será explicado a continuación el ejercicio realizado en clase en el grupo PE103, y después el resto de ejercicios propuestos en el guión:

## Ejercicio PE103

### Enunciado

- Desarrolle un cliente y un servidor en Node.js, haciendo uso de sockets, que incorporen la siguiente funcionalidad:
El cliente debe recibir, desde la línea de comandos, un comando Unix/Linux, además de sus argumentos correspondientes, que ejecutaremos en el servidor.
El servidor debe recibir la petición del cliente, procesarla, esto es, ejecutar el comando solicitado, y devolver la respuesta del comando al cliente. Para ello, piense que el comando solicitado puede haberse ejecutado correctamente o puede haber fallado, por ejemplo, por no existir o porque se le han pasado unos argumentos no válidos.

#### Código

- En el directorio src/Ejercicio-PE103 tenemos ```server.ts```:

```TypeScript
import net from 'net';
import { spawn } from 'child_process';

/**
 * Creamos un servidor que escucha en el puerto 8100 y espera recibir mensajes JSON desde un cliente.
 * Cuando se recibe un mensaje que tiene el campo 'type' establecido en 'command', ejecuta el comando
 * especificado en el campo 'com' junto con los parámetros especificados en el campo 'param'.
 * El resultado de la ejecución del comando se envía de vuelta al cliente a través de la conexión.
 */
net.createServer((connection) => {
  connection.on('data', (data) => {
    // Convertir los datos recibidos en un objeto JavaScript utilizando JSON.parse.
    let mensaje = JSON.parse(data.toString());

    // Si el mensaje recibido es un comando, ejecutarlo y enviar la salida de vuelta al cliente.
    if(mensaje.type == 'command') {
      console.log("Se ejecutara el comando: " + mensaje.com + " " + mensaje.param);
      let salida;
      if(mensaje.param == undefined) {
        // Si no hay parámetros, solo se ejecuta el comando.
        salida = spawn(mensaje.com);
      } else {
        // Si hay parámetros, se pasan como argumentos al comando.
        salida = spawn(mensaje.com, [mensaje.param]);
      }

      // Enviar cualquier salida de error del comando de vuelta al cliente a través de la conexión.
      salida.stderr.on('data', (data) => {
        connection.write(data.toString());
      });

      // Enviar cualquier salida estándar del comando de vuelta al cliente a través de la conexión.
      salida.stdout.on('data', (data) => {
        connection.write(data.toString());
      });
    }
  });

  // Cuando se cierra la conexión, imprimir un mensaje en la consola.
  connection.on('close' , () => {
    console.log('Cliente ha sido desconectado');
  });

// Escuchar en el puerto 8100 y imprimir un mensaje en la consola cuando el servidor está listo.
}).listen(8100, () => {
  console.log('Servidor a la espera escuchando puerto 8100');
});
```

Se crea un servidor que escucha en el puerto 8100 y espera recibir mensajes JSON desde un cliente. Cuando se recibe un mensaje que tiene el campo ```type``` establecido en ```command```, ejecuta el comando especificado en el campo ```com``` junto con los parámetros especificados en el campo ```param```. El resultado de la ejecución del comando se envía de vuelta al cliente a través de la conexión. Si hay algún error en la ejecución del comando, se envía de vuelta al cliente a través de la conexión. Cuando se cierra la conexión, se imprime un mensaje en la consola. El servidor está listo para recibir conexiones en el puerto 8100.

- También tenemos ```client.ts```:

```TypeScript
import net from 'net';

/**
 * Crear una instancia de un cliente de conexión TCP/IP mediante la librería 'net'.
 * Conectar el cliente al puerto 8100.
 */
const client = net.connect({port: 8100});

/**
 * Se ejecuta cuando el cliente establece conexión con éxito.
 * Envía un comando al servidor en formato JSON, basado en los argumentos proporcionados al invocar el script.
 */
client.on('connect' , () => {
  if (process.argv.length < 3) { 
    // Si no se proporciona ningún comando al invocar el script, se muestra un error y se finaliza el proceso.
    console.log("Error: No se ha introducido ningún comando");
    process.exit(1);
  }
  // Enviar un objeto JSON al servidor, indicando el tipo de comando, el comando en sí mismo y un parámetro (si se proporciona).
  client.write(JSON.stringify({'type': 'command', 'com': process.argv[2], 'param': process.argv[3]}));
});

/**
 * Se ejecuta cuando el cliente recibe datos del servidor.
 * Muestra los datos recibidos por la consola y finaliza la conexión.
 */
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

/**
 * Se ejecuta cuando la conexión con el servidor se cierra.
 * Muestra un mensaje por consola indicando que el cliente se ha desconectado.
 */
client.on('close', () => {
  console.log('Cliente desconectado');
});
```

Este código establece una conexión TCP/IP mediante la librería ```net``` con un servidor en el puerto 8100 y envía un comando en formato JSON al servidor, basado en los argumentos proporcionados al invocar el script. Si no se proporciona ningún comando, se muestra un error y se finaliza el proceso. Cuando el cliente recibe datos del servidor, muestra los datos recibidos por la consola y finaliza la conexión. Y cuando la conexión con el servidor se cierra, muestra un mensaje por consola indicando que el cliente se ha desconectado.



## Ejercicio 1

### Enunciado

Considere el siguiente ejemplo de código fuente TypeScript que hace uso del módulo fs de Node.js:

```TypeScript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

En primer lugar, ejecute el programa para tratar de comprender qué hace.

A continuación, realice una traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola. Para ello, simule que se llevan a cabo, como mínimo, dos modificaciones del fichero helloworld.txt a lo largo de la ejecución. ¿Qué hace la función access? ¿Para qué sirve el objeto constants?

#### Resultado

A continuación vemos cual sería la traza: 

1. El programa se inicia con el comando node programa.js helloworld.txt.
Pila de llamadas: [Función principal (global)]

2. Se importan las funciones 'access', 'constants' y 'watch' del módulo 'fs'.
Pila de llamadas: [Función principal (global)]

3. La longitud de 'process.argv' es 3 (node, programa.js y helloworld.txt).
Pila de llamadas: [Función principal (global)]

4. Se asigna el nombre del archivo a la variable 'filename'.
Pila de llamadas: [Función principal (global)]

5. Se llama a la función 'access' con 'filename', 'constants.F_OK' y una función de callback.
Pila de llamadas: [Función principal (global), access]

Registro de eventos de la API: []

6. La función 'access' verifica si el archivo 'helloworld.txt' existe y es accesible.
Pila de llamadas: [Función principal (global)]

Registro de eventos de la API: [Verificación de acceso al archivo]

7. La función 'access' no encuentra errores y pone en cola la función de callback.
Pila de llamadas: [Función principal (global)]

Cola de manejadores: [Función de callback de access]

8. La función de callback de 'access' se ejecuta.
Pila de llamadas: [Función principal (global), Función de callback de access]

9. Se imprime en consola: 'Starting to watch file helloworld.txt'.
Pila de llamadas: [Función principal (global), Función de callback de access]

10. Se crea un 'watcher' utilizando la función 'watch' con 'filename' como argumento.
Pila de llamadas: [Función principal (global), Función de callback de access]

11. Se registra un evento 'change' en el 'watcher', que se activa cuando el archivo es modificado.
Pila de llamadas: [Función principal (global), Función de callback de access]

12. Se imprime en consola: 'File helloworld.txt is no longer watched'.
Pila de llamadas: [Función principal (global)]

13. El usuario modifica el archivo 'helloworld.txt' por primera vez.
Registro de eventos de la API: [Evento 'change' en watcher]

14. El evento 'change' se activa y pone en cola el manejador correspondiente.
Pila de llamadas: [Función principal (global)]

Cola de manejadores: [Manejador del evento 'change']

15. El manejador del evento 'change' se ejecuta.
Pila de llamadas: [Función principal (global), Manejador del evento 'change']

16. Se imprime en consola: 'File helloworld.txt has been modified somehow'.
Pila de llamadas: [Función principal (global)]

17. El usuario modifica el archivo 'helloworld.txt' por segunda vez.
Registro de eventos de la API: [Evento 'change' en watcher]

18. El evento 'change' se activa nuevamente y pone en cola el manejador correspondiente.
Pila de llamadas: [Función principal (global)]

Cola de manejadores: [Manejador del evento 'change']

19. El manejador del evento 'change' se ejecuta nuevamente.
Pila de llamadas: [Función principal (global), Manejador del evento 'change']

20. Se imprime en consola: 'File helloworld.txt has been modified somehow'.
Pila de llamadas: [Función principal (global)]

21. No hay más eventos ni acciones por realizar. La ejecución del programa continúa a la espera de más eventos de modificación del archivo. Si el usuario cierra el programa, la pila de llamadas se vaciará y la aplicación finalizará.
Pila de llamadas: [Función principal (global)]

Esta traza de ejecución muestra el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores paso a paso, desde el inicio del programa hasta que se detectan dos modificaciones (como se nos indica en el enunciado) en el archivo ```helloworld.txt``` y se imprimen los mensajes correspondientes en la consola.


¿Qué hace la función access?

Es una función asíncrona que comprueba los permisos de acceso a un archivo o directorio. En este caso se comprueba si el archivo existe.

¿Para qué sirve el objeto constants?

Es una constante del paquete fs que determina si el fichero es accesible para lectura, escritura o ejecución, es decir, si el fichero existe.



## Ejercicio 2

### Enunciado


Escriba una aplicación que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. La ruta donde se encuentra el fichero debe ser un parámetro pasado a la aplicación desde la línea de comandos. Adicionalmente, también deberá indicarle al programa desde la línea de comandos si desea visualizar el número de líneas, palabras, caracteres o combinaciones de ellas. Puede gestionar el paso de parámetros desde la línea de comandos haciendo uso de yargs.

Lleve a cabo el ejercicio anterior de dos maneras diferentes:

Haciendo uso del método pipe de un Stream para poder redirigir la salida de un comando hacia otro.
Sin hacer uso del método pipe, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos necesarios para implementar la funcionalidad solicitada.
Para lo anterior, se recomienda leer la documentación de Stream. Piense que la propiedad stdin de un objeto ChildProcess es un Stream de escritura, mientras que su propiedad stdout es un Stream de lectura.

Por último, programe defensivamente, es decir, trate de controlar los potenciales errores que podrían surgir a la hora de ejecutar su programa. Por ejemplo, ¿qué sucedería si indica desde la línea de comandos un fichero que no existe o una opción no válida?

#### Código

- Usando pipe tenemos ```PipeReader.ts```:

```TypeScript
/**
 * Este módulo utiliza el paquete yargs para parsear argumentos de línea de comandos y opciones
 * para el comando wc (word count) de Linux para contar palabras, líneas y caracteres en un archivo de texto.
 * También utiliza los paquetes fs y child_process para leer el archivo y ejecutar comandos de shell, respectivamente.
 *
 * @packageDocumentation
 */

import {readFile} from 'fs';
import {spawn} from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Parsear argumentos de línea de comandos con yargs
yargs(hideBin(process.argv))
  .boolean(['l', 'w', 'm']) // Opciones booleanas que indican qué tipo de recuento de palabras se debe hacer
  .command('wc', 'word count of a text file', { // Comando "wc" para contar palabras de un archivo de texto
    file: { // Argumento requerido que especifica el archivo a procesar
      description: 'the file\'s name',
      type: 'string',
      demandOption: true
    }
  }, (argv) => { // Función que se ejecuta cuando se llama al comando "wc"
    readFile(argv.file, (err) => { // Leer el archivo especificado en el argumento
      if (err) {
        console.log(`No existe el fichero ${argv.file}`)
      }

      if (argv.l) {     
        const wcl = spawn('wc', ['-l', argv.file]);     
        const cut = spawn('cut', ['-d', ' ', '-f', '1']); 

        wcl.stdout.pipe(cut.stdin);
        cut.stdout.pipe(process.stdout);
      }

      if (argv.w) {        
        const wcw = spawn('wc', ['-w', argv.file]);     
        const cut = spawn('cut', ['-d', ' ', '-f', '1']); 

        wcw.stdout.pipe(cut.stdin);
        cut.stdout.pipe(process.stdout);
      }

      if (argv.m) {
        const wcm = spawn('wc', ['-m', argv.file]);     
        const cut = spawn('cut', ['-d', ' ', '-f', '1']); 

        wcm.stdout.pipe(cut.stdin);
        cut.stdout.pipe(process.stdout);
      }

      if (argv.l === undefined && argv.w === undefined && argv.m === undefined) {
        console.log('No ha utilizado ninguna de las opciones posibles (--l, --w, --m)');
      }
    })
  })
  .help() // Mostrar la ayuda
  .argv; // Ejecutar el programa
```

Este código utiliza los paquetes ```fs```, ```child_process``` y ```yargs``` para crear una herramienta en línea de comandos que cuenta palabras, líneas y caracteres en un archivo de texto. El script parsea los argumentos de línea de comandos usando yargs y verifica si se han especificado las opciones -l, -w o -m. Dependiendo de las opciones especificadas, el script utiliza spawn para ejecutar los comandos de Linux wc y cut para contar palabras, líneas y caracteres en el archivo de texto. Finalmente, el script muestra los resultados en la consola y, si no se ha especificado ninguna opción, muestra un mensaje de ayuda.

- Sin usar pipe tenemos ```NoPipeReader.ts```:

```TypeScript
/**
 * Librerías necesarias para la ejecución del script
 */
import {readFile} from 'fs';
import {spawn} from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Configuración de las opciones del script a través de yargs
 */
yargs(hideBin(process.argv))
  /**
   * Opciones de tipo booleano: l, w, m
   */
  .boolean(['l', 'w', 'm'])
  /**
   * Definición del comando "wc"
   * Descripción: cuenta las palabras de un archivo de texto
   * Parámetro obligatorio: nombre del archivo a contar
   */
  .command('wc', 'word count of a text file', {
    file: {
      description: 'the file\'s name',
      type: 'string',
      demandOption: true
    }
  }, (argv) => {
    /**
     * Lee el archivo especificado y verifica si existe
     */
    readFile(argv.file, (err) => {
      if (err) {
        console.log(`No existe el fichero ${argv.file}`)
      }

      /**
       * Ejecuta el comando "wc" en la terminal con el archivo especificado
       */
      const wc = spawn('wc', [argv.file]);

      let wcOutput = '';
      /**
       * Captura la salida del comando "wc"
       */
      wc.stdout.on('data', (data) => wcOutput += data);

      /**
       * Muestra los resultados según las opciones seleccionadas
       */
      wc.on('close', () => {
        const wcOutputArray = wcOutput.split(" ");        
        if (argv.l) {
          console.log(`El fichero ${argv.file} tiene ${wcOutputArray[1]} líneas.`);
        }
        if (argv.w) {
          console.log(`El fichero ${argv.file} tiene ${wcOutputArray[3]} palabras.`);
        }
        if (argv.m) {
          console.log(`El fichero ${argv.file} tiene ${wcOutputArray[4]} caracteres.`);
        }
        if (argv.l === undefined && argv.w === undefined && argv.m === undefined) {
          console.log('No ha utilizado ninguna de las opciones posibles (--l, --w, --m)');
        }
      });

      /**
       * Muestra un mensaje de error si ocurre un problema al ejecutar el comando "wc"
       */
      wc.on('error', (err) => {
        console.error('Error al ejecutar el comando', err);
      });
    })
  })
  /**
   * Muestra la ayuda del script
   */
  .help()
  .argv;
```

Toma las opciones de línea de comandos especificadas por el usuario con yargs, lee el archivo de texto con ```readFile```, ejecuta el comando wc en la terminal para contar el número de palabras, líneas o caracteres en el archivo y muestra los resultados según las opciones seleccionadas por el usuario.





## Conclusiones

Ejercicio bastante interesante a la par que entretenido de realizar. A medida que avanzamos en la asignatura voy descrubiendo nuevas herramientas muy útiles que desconocía. También desconocía todo el mundillo este de coleccionismo de FunkoPops pero está bastante curioso.



## Elementos Bibliográficos:

- Principios SOLID, https://profile.es/blog/principios-solid-desarrollo-software-calidad/.

- Guión de la Práctica 9, https://ull-esit-inf-dsi-2223.github.io/prct09-filesystem-funko-app/ .

- Sobre un warning en particular de TypeDoc, https://github.com/TypeStrong/typedoc/issues/1739 .

- Adam Freeman - Essential TypeScript 4: From Beginner to ProURL,https://www.oreilly.com/library/view/essential-typescript-4/9781484270110/html/Part_1.xhtml .

- Basic writing and formatting syntax, https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax .




By:
```
EEEEEEEEEEEEEE   DDDDDDDDDDDDD         UUUUUUU       UUUUUUU
E::::::::::::E   D:::::::::::::D       U:::::U       U:::::U
E::::::::::::E   D:::::::::::::::D     U:::::U       U:::::U
EE:::::::EEEEE   DDD::::DDDDD:::::D    U:::::U       U:::::U
  E:::::E         D:::::D    D:::::D   U:::::U       U:::::U 
  E:::::E         D:::::D     D:::::D  U:::::U       U:::::U 
  E::::::EEEEEEE  D:::::D     D:::::D  U:::::U       U:::::U 
  E::::::::::::E  D:::::D     D:::::D  U:::::U       U:::::U 
  E::::::::::::E  D:::::D     D:::::D  U:::::U       U:::::U 
  E::::::EEEEEEE  D:::::D     D:::::D  U:::::U       U:::::U 
  E:::::E         D:::::D     D:::::D  U:::::U       U:::::U 
  E:::::E         D:::::D    D:::::D   U::::::U     U::::::U 
EE:::::::EEEEE   DDD::::DDDDD:::::D     U:::::::UUU:::::::U 
E::::::::::::E   D:::::::::::::::D       UU:::::::::::::UU  
E::::::::::::E   D:::::::::::::D           UU:::::::::UU    
EEEEEEEEEEEEEE   DDDDDDDDDDDDD               UUUUUUUUU  
```