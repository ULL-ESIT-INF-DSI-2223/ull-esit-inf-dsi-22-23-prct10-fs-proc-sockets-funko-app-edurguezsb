[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/NApXvVde)
# Práctica 10

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-edurguezsb/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-edurguezsb?branch=master)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-edurguezsb&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-edurguezsb)


En esta actividad, la Práctica 9 de la asignatura, se nos plantea realizar una aplicación que nos ayudará a almacenar la información sobre los funkos de un usuario, todo esto gracias a que vamos a trabajar como almacenar la información en un JSON al igual que tuvimos que hacer en la práctica anterior realizada en grupo. También, al igual que llevamos haciendo en prácticas anteriores hasta ahora, a parte de llevar a cabo una buena estructura y organización de ficheros y directorios, no debemos olvidarnos de utilizar los principios SOLID,sus pruebas TDD o BDD para confirmar el correcto funcionamiento del código desarrollado, todo el código con comentarios tipo TypeDoc, cubrimiento de código con Istanbul y Coveralls, Sonar Cloud para analizar la calidad, y los github actions.

Los objetivos de esta práctica son seguir familiarizándonos con el manejo de las herramientas mencionadas anteriormente ya que son bastante fundamentales a la hora de realizar un proyecto en TypeScript para asegurarnos de que nuestra solución es buena, y que serán necesarios para el correcto desarrollo y avance en la asignatura de Desarrollo de Sistemas Informáticos, junto con lo ya trabjado en prácticas anteriores, y lo que iremos viendo en las próximas semanas.


También será explicado a continuación el ejercicio realizado en clase en el grupo PE103, y depués el de los Funkos:

## Ejercicio PE103

### Enunciado

- Desarrolle los siguientes ejercicios en un proyecto alojado en un nuevo repositorio de GitHub:
Suponga que tiene que utilizar un algoritmo para extraer información de ficheros que contienen información sobre una instancia del problema de la mochila. El inconveniente es que los ficheros se encuentran en diferentes formatos: CSV y JSON.
El formato de uno de los ficheros CSV es el siguiente. En la primera línea, un valor numérico que especifica la capacidad de la mochila; en la segunda línea, un valor que especifica el número de elementos n de la mochila; y, a continuación, n líneas, donde cada línea tiene el número de elemento, peso y beneficio separado por comas.
El formato de uno de los ficheros JSON es el siguiente: una propiedad "capacidad", con la capacidad de la mochila, una propiedad "numElementos", con el número de elementos de la mochila y, luego, una propiedad "elementos" que consiste en un array de objetos, donde cada objeto contiene las propiedades "númElemento", "peso" y "beneficio".
Escriba una clase con un método de plantilla que consista en un único paso "procesar", que lleve a cabo la lectura de un fichero CSV o un fichero JSON con los formatos anteriormente especificados y que devuelva dos arrays: uno con los beneficios de los elementos de la mochila y otro con los pesos de los elementos de la mochila. El método de plantilla también deberá hacer uso de dos métodos de enganche o hooks.

#### Código

- En el directorio src/PE103/Prueba tenemos ```Prueba.ts```:

```TypeScript
import { Mochila } from '../Mochila/Mochila';

const mochila = new Mochila();

const [beneficios, pesos] = mochila.procesar('./a.csv');
console.log(beneficios); // [20, 10, 25, 8, 35]
console.log(pesos); // [10, 5, 12, 6, 15]

const [beneficios2, pesos2] = mochila.procesar('./a.json');
console.log(beneficios2); // [20, 10, 25]
console.log(pesos2); // [10, 5, 12]
```

Se importa una clase ```Mochila``` desde el archivo '../Mochila/Mochila'. Luego, crea una instancia de ```Mochila``` y la almacena en la variable ```mochila```.

A continuación, el código llama al método ```procesar``` de ```mochila``` dos veces: una vez con el argumento './a.csv' y otra vez con el argumento './a.json'.

Cada vez que se llama al método ```procesar```, devuelve dos arrays: uno llamado ```beneficios``` y otro llamado ```pesos```.

Finalmente, el código imprime los valores de los arrays ```beneficios``` y ```pesos``` devueltos por cada llamada a ```procesar```. En el primer caso, los arrays contienen los valores [20, 10, 25, 8, 35] y [10, 5, 12, 6, 15], y en el segundo caso, los arrays contienen los valores [20, 10, 25] y [10, 5, 12].


- En el directorio src/PE103/Mochila tenemos ```Mochila.ts```:

```TypeScript
import * as fs from 'fs';

/**
 * Clase Mochila
 * @param capacidadMochila capacidad de la mochila
 * @param elementos elementos que se pueden meter en la mochila
 * @param leerArchivoCSV leer un archivo CSV
 * @param leerArchivoJSON leer un archivo JSON
 * @param procesar procesar un archivo
 */
export class Mochila<T extends { peso: number; beneficio: number }> {
  private capacidadMochila: number = 0;
  private elementos: T[] = [];

  constructor() {}

  /**
   * Método que lee un archivo CSV
   * @param ubicacion ubicación del archivo
   */
  private leerArchivoCSV(ubicacion: string): void {
    // Importamos el módulo fs
    const archivo = fs.readFileSync(ubicacion, 'utf-8');
    const lineas = archivo.trim().split(/\r?\n/);
    this.capacidadMochila = Number(lineas[0]);
    const numElementos = Number(lineas[1]);
    for (let i = 2; i < numElementos + 2; i++) {
      const [peso, beneficio] = lineas[i].trim().split(/\s+/).map(Number);
      this.elementos.push({ peso, beneficio } as T);
    }
  }

  /**
   * Método que lee un archivo JSON
   * @param ubicacion ubicación del archivo
   */
  private leerArchivoJSON(ubicacion: string): void {
    // Importamos el módulo fs
    const archivo = fs.readFileSync(ubicacion, 'utf-8');
    const { capacidad, numElementos, elementos } = JSON.parse(archivo);
    this.capacidadMochila = capacidad;
    for (const elemento of elementos) {
      const { númElemento, peso, beneficio } = elemento;
      this.elementos.push({ peso, beneficio } as T);
    }
  }

  /**
   * Método que procesa un archivo CSV o JSON
   * @param ubicacion ubicación del archivo a procesar
   * @returns un array con los beneficios y pesos de los elementos de la mochila
   * @throws un error si el formato del archivo no es válido
   */
  public procesar(ubicacion: string): [number[], number[]] {
    // Importamos el módulo fs
    const extension = ubicacion.split('.').pop();
    switch (extension) {
      case 'csv':
        this.leerArchivoCSV(ubicacion);
        break;
      case 'json':
        this.leerArchivoJSON(ubicacion);
        break;
      default:
        throw new Error(`El formato del archivo ${ubicacion} no es válido`);
}

    const beneficios: number[] = [];
    const pesos: number[] = [];
    for (const elemento of this.elementos) {
      beneficios.push(elemento.beneficio);
      pesos.push(elemento.peso);
    }
    return [beneficios, pesos];
  }
}
```

Se define una clase llamada ```Mochila```. La clase tiene una propiedad privada ```capacidadMochila``` que representa la capacidad de la mochila y una propiedad privada ```elementos``` que es un array de objetos con propiedades ```peso``` y ```beneficio```. La clase tiene tres métodos privados ```leerArchivoCSV```, ```leerArchivoJSON``` y ```procesar```, y un ```constructor``` vacío.

El método ```leerArchivoCSV``` lee un archivo CSV en la ubicación dada y carga los datos en la propiedad ```elementos```. El método ```leerArchivoJSON``` lee un archivo JSON en la ubicación dada y carga los datos en la propiedad ```elementos```. El método ```procesar``` toma una ubicación de archivo y procesa el archivo usando los métodos ```leerArchivoCSV``` o ```leerArchivoJSON``` según la extensión del archivo. Si el formato del archivo no es válido, lanza un error.


También se realizaron pruebas con Mocha y Chai que fueron debidamente superadas:

```Bash
  Mochila
    procesar
      ✔ debería leer un archivo CSV correctamente
      ✔ debería leer un archivo JSON correctamente
      ✔ debería lanzar un error si el formato del archivo no es válido


  3 passing (38ms)

-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |     100 |      100 |     100 |     100 |                   
 PE103/Mochila   |     100 |      100 |     100 |     100 |                   
  Mochila.ts     |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
```


## Práctica 9 - Aplicación de registro de Funko Pops

### Enunciado

En esta práctica, tendrá que implementar una aplicación que permita almacenar información de los Funko Pops pertenecientes a la colección de un usuario. En concreto, el sistema permitirá añadir, modificar, eliminar, listar y leer la información asociada a un Funko. La información de cada Funko se almacenará como un JSON en el sistema de ficheros de la máquina donde se ejecute la aplicación. Además, solo se podrá interactuar con la aplicación desde la línea de comandos (no existirá un menú interactivo).

Siguiendo todas las indicaciones del guión de la práctica, y también siguiendo todos sus requisitos, hemos acabado con un programa funcional que cumple con el enunciado. A continuación veremos el código comentado/explicado, las pruebas realizadas, etc:

- En el directorio src/FunkoApp/BasicFunkoPop tenemos ```BasicFunkoPop.ts```:

```TypeScript
import { FunkoType } from '../Type/Type.js'
import { FunkoGenre } from '../Genre/Genre.js'

/**
 * Interfaz que define las propiedades que se espera que tenga un objeto FunkoPop básico.
 */
export interface BasicFunkoPopInfo {
  id: number // Identificador numérico
  name: string // Nombre
  description: string // Descripción
  type: FunkoType // Tipo de FunkoPop
  genre: FunkoGenre // Género de FunkoPop
}

/**
 * Clase abstracta que implementa la interfaz BasicFunkoPopInfo y define un constructor que inicializa las propiedades de la instancia de la clase.
 */
export abstract class BasicFunkoPop implements BasicFunkoPopInfo {
  constructor(
    public readonly id: number, // Identificador numérico
    public name: string, // Nombre
    public description: string, // Descripción
    public type: FunkoType, // Tipo de FunkoPop
    public genre: FunkoGenre // Género de FunkoPop
  ) {}
}
```

En este código se define una interfaz ```BasicFunkoPopInfo``` que establece las propiedades que se esperan en un objeto ```FunkoPop``` básico, como el identificador, nombre, descripción, tipo y género. Luego, se define una clase abstracta ```BasicFunkoPop``` que implementa esta interfaz y proporciona un ```constructor``` para inicializar las propiedades de una instancia de la clase.


- En el directorio src/FunkoApp/FunkoPop tenemos ```FunkoPop.ts```:

```TypeScript
import chalk from "chalk";
import { BasicFunkoPop } from '../BasicFunkoPop/BasicFunkoPop.js';
import { FunkoType } from '../Type/Type.js';
import { FunkoGenre } from '../Genre/Genre.js';

/**
 * Interfaz que define la información adicional que puede tener un FunkoPop.
 */
export interface FunkoPopInfo {

  /**
   * La marca del FunkoPop.
   */
  brand: string;

  /**
   * El id de la marca del FunkoPop.
   */
  brandId: number;

  /**
   * El precio de mercado del FunkoPop.
   */
  marketPrice: number;

  /**
   * Indica si el FunkoPop es una edición exclusiva.
   */
  exclusive: boolean;

  /**
   * Lista de características especiales del FunkoPop.
   */
  especial: string[];
}

/**
 * Clase que representa un FunkoPop.
 */
export class FunkoPop extends BasicFunkoPop implements FunkoPopInfo {

  /**
   * El precio de mercado del FunkoPop.
   */
  public marketPrice = 0;

  /**
   * Indica si el FunkoPop es una edición exclusiva.
   */
  public exclusive = false;

  /**
   * Lista de características especiales del FunkoPop.
   */
  public especial: string[] = [];

  /**
   * Crea una instancia de la clase FunkoPop.
   * @param id El id del FunkoPop.
   * @param name El nombre del FunkoPop.
   * @param description La descripción del FunkoPop.
   * @param type El tipo del FunkoPop.
   * @param genre El género del FunkoPop.
   * @param brand La marca del FunkoPop.
   * @param brandId El id de la marca del FunkoPop.
   */
  constructor(
    id: number,
    name: string,
    description: string,
    type: FunkoType,
    genre: FunkoGenre,
    public readonly brand: string,
    public readonly brandId: number,
  ) {
    super(id, name, description, type, genre);
  }

  /**
   * Imprime la información del FunkoPop en la consola.
   * @param funko El FunkoPop a imprimir.
   */
  public static print(funko: FunkoPop): void {
    console.table({ id: funko.id, name: funko.name, description: funko.description, type: funko.type, genre: funko.genre, brand: funko.brand, brandId: funko.brandId, exclusive: funko.exclusive, especial: funko.especial });
    if (funko.marketPrice < 10)
      console.log(chalk.greenBright(`Market Price: $${funko.marketPrice}`));
    else if (funko.marketPrice < 20)
      console.log(chalk.green(`Market Price: $${funko.marketPrice}`));
    else if (funko.marketPrice < 30)
      console.log(chalk.yellow(`Market Price: $${funko.marketPrice}`));
    else
      console.log(chalk.redBright(`Market Price: $${funko.marketPrice}`));
  }
}
```

Se define la clase ```FunkoPop```, que representa un FunkoPop y que hereda de la clase ```BasicFunkoPop```. La clase ```FunkoPop``` implementa la interfaz ```FunkoPopInfo```, que define información adicional que puede tener un FunkoPop, como la marca, el precio de mercado y características especiales. La clase tiene un ```constructor``` que acepta argumentos para todas las propiedades, incluyendo las propiedades de la interfaz ```FunkoPopInfo```. La clase también tiene un método estático ```print``` que imprime la información del FunkoPop en la consola y que usa la biblioteca ```chalk``` para colorear la salida de acuerdo con el precio de mercado del FunkoPop.

- En el directorio src/FunkoApp/Genre tenemos ```Genre.ts```:

```TypeScript
/**
 * Enumeración de géneros para figuras de Funko.
 * @enum
 */
export enum FunkoGenre {
  /** 
   * Animación 
   */
  ANIMATION = 'Animation',
  /** 
   * Anime 
   */
  ANIME = 'Anime',
  /** 
   * Películas y TV 
   */
  MOVIES_AND_TV = 'Movies and TV',
  /** 
   * Videojuegos 
   */
  VIDEO_GAMES = 'Video Games',
  /** 
   * Música 
   */
  MUSIC = 'Music',
  /** 
   * Cómics 
   */
  COMICS = 'Comics',
  /** 
   * Deportes
   */
  SPORTS = 'Sports',
}
```

Aquí tenemos una enumeración llamada ```FunkoGenre``` que enumera los diferentes géneros de figuras de Funko. Cada elemento de la enumeración representa un género y tiene un valor de cadena asociado que describe el género.

- En el directorio src/FunkoApp/Type tenemos ```Type.ts```:

```TypeScript
/**
 * Enumeración que representa los distintos tipos de funkos.
 * @enum
 */
export enum FunkoType {
  /**
   * Tipo de funko "Pop!"
   */
  POP = 'Pop!',
  /**
   * Tipo de funko "Pop! Black and White"
   */
  POP_BLACK_AND_WHITE = 'Pop! Black and White',
  /**
   * Tipo de funko "Pop! Glitter"
   */
  POP_GLITTER = 'Pop! Glitter',
  /**
   * Tipo de funko "Pop! Rides"
   */
  POP_RIDES = 'Pop! Rides',
  /**
   * Tipo de funko "Vynil Soda"
   */
  VYNIL_SODA = 'Vynil Soda',
  /**
   * Tipo de funko "Vynil Gold"
   */
  VYNIL_GOLDEN = 'Vynil Gold',
  /**
   * Tipo de funko "Pop! Keychain"
   */
  POP_KEYCHAIN = 'Pop! Keychain',
}
```

En este caso, tenemos una enumeración llamada ```FunkoType``` que contiene los distintos tipos de Funkos. Cada tipo es representado por una cadena de texto y tiene un valor asignado. Los valores de los tipos de Funkos son: "Pop!", "Pop! Black and White", "Pop! Glitter", "Pop! Rides", "Vynil Soda", "Vynil Gold" y "Pop! Keychain". Esta enumeración permite tener una lista de valores posibles para el tipo de Funko en lugar de tener que escribir manualmente cada tipo.


- En el directorio src/FunkoApp/User tenemos ```user.ts```:

```TypeScript
import fs from 'fs';
import chalk from 'chalk';
import { FunkoPop } from '../FunkoPop/FunkoPop.js';

/**
 * Interfaz que representa la información y los métodos del usuario
 * @interface
 */
export interface UserInfo {
  name: string;
  collection: FunkoPop[];
  addFunko(funkoPop: FunkoPop): string;
  modifyFunko(funkoPop: FunkoPop): string;
  removeFunko(funkoPop: FunkoPop): string;
  listFunkos(): void;
  searchFunko(funkoPop: FunkoPop): string;
  save(): void;
  load(): void;
}

/**
 * Clase que representa a un usuario con una colección de Funko Pops
 * @class
 */
export class User implements UserInfo {
  public collection: FunkoPop[];

  /**
   * Crea una nueva instancia de usuario
   * @param name - El nombre del usuario
   * @param funkoPops - Un parámetro que representa la colección de Funko Pops del usuario
   */
  constructor(public readonly name: string, ...funkoPops: FunkoPop[]) {
    this.collection = funkoPops;
  }

  /**
   * Agrega un nuevo Funko Pop a la colección del usuario.
   * @param funkoPop - El Funko Pop a agregar
   * @returns Un mensaje que indica el éxito o fracaso de la operación.
   */
  public addFunko(funkoPop: FunkoPop): string {
    const notSameId = this.collection.filter((f) => f.id !== funkoPop.id);
    if (notSameId.length !== this.collection.length) {
      return chalk.red(
        `Already exists a Funko Pop with id ${funkoPop.id} in ${this.name}'s collection`
      );
    }
    this.collection.push(funkoPop);
    return chalk.green(`${funkoPop.name} added to ${this.name}'s collection`);
  }

  /**
   * Modifica un Funko Pop existente en la colección del usuario.
   * @param funkoPop - El Funko Pop a modificar
   * @returns Un mensaje que indica el éxito o fracaso de la operación.
   */
  public modifyFunko(funkoPop: FunkoPop): string {
    const notSameId = this.collection.filter((f) => f.id !== funkoPop.id);
    if (notSameId.length === this.collection.length) {
      return chalk.red(
        `Funko Pop with id ${funkoPop.id} not in ${this.name}'s collection`
      );
    }
    this.collection = this.collection.map((f) =>
      f.id === funkoPop.id ? funkoPop : f
    );
    return chalk.green(
      `Funko Pop with id ${funkoPop.id} modified in ${this.name}'s collection`
    );
  }


  /**
   * Elimina un Funko Pop existente en la colección del usuario.
   * @param funkoPop - El Funko Pop a eliminar
   * @returns Un mensaje que indica el éxito o fracaso de la operación.
   */
  public removeFunko(funkoPop: FunkoPop): string {
    const notSameId = this.collection.filter((f) => f.id !== funkoPop.id)
    if (notSameId.length === this.collection.length)
      return chalk.red(
        `Funko Pop with id ${funkoPop.id} not in ${this.name}'s collection`
      )
    this.collection = notSameId
    return chalk.green(
      `${funkoPop.name} removed from ${this.name}'s collection`
    )
  }

  /**
   * Lista todos los Funko Pops de la colección.
   */
  public listFunkos(): void {
    this.collection.forEach((funkoPop) => FunkoPop.print(funkoPop))
  }

  /**
   * Busca un Funko Pop en la colección por ID.
   * @param funkoPop - El Funko Pop a buscar.
   * @returns Un mensaje que indica el éxito o fracaso de la operación.
   */
  public searchFunko(funkoPop: FunkoPop): string {
    const notSameId = this.collection.filter((f) => f.id !== funkoPop.id)
    if (notSameId.length === this.collection.length)
      return chalk.red(`${funkoPop.name} not in ${this.name}'s collection`)

    const result = this.collection.find((f) => f.id === funkoPop.id)
    if (result) FunkoPop.print(result)

    return chalk.green(`${funkoPop.name} found in ${this.name}'s collection`)
  }

  /**
   * Guarda la colección en un archivo JSON.
   */
  public save(): void {
    const data = JSON.stringify(this)
    fs.writeFileSync(`./data/users/${this.name}.json`, data)
  }

  /**
   * Carga la colección desde un archivo JSON.
   */
  public load(): void {
    const file = fs.readFileSync(`./data/users/${this.name}.json`, 'utf-8')
    const user = JSON.parse(file)
    this.collection = user.collection
  }
}
```

Se define una interfaz ```UserInfo``` y una clase ```User``` que implementa esa interfaz. User representa a un usuario que tiene una colección de figuras Funko Pop y proporciona una serie de métodos para manipular esta colección, como agregar, modificar, buscar y eliminar figuras Funko Pop, así como listar todas las figuras Funko Pop de la colección y guardar o cargar la colección desde un archivo _JSON_. El código utiliza las bibliotecas _fs_ y _chalk_ y una clase ```FunkoPop``` externa que es la que hemos visto anteriormente para proporcionar esta funcionalidad.

Por ejemplo probando el programa, así es como se vería la información de un funko que tengamos:

```Bash
┌─────────────┬──────────────────────────────────────────┐
│   (index)   │                  Values                  │
├─────────────┼──────────────────────────────────────────┤
│     id      │                    2                     │
│    name     │          'Darth Vader modified'          │
│ description │ 'The most famous character of Star Wars' │
│    type     │                  'Pop!'                  │
│    genre    │             'Movies and TV'              │
│    brand    │               'Star Wars'                │
│   brandId   │                    2                     │
│  exclusive  │                  false                   │
│  especial   │                                          │
└─────────────┴──────────────────────────────────────────┘
Market Price: $50
```

Y aquí se muestran las pruebas pasadas junto al cubrimiento de código:

```Bash
  Funko class
    ✔ deberían tener diferentes tipos y géneros
    ✔ deberían tener una identificación única
    ✔ deberían tener un nombre
    ✔ deberían tenewr una descripción
    ✔ deberían tener un tipo
    ✔ deberían tener un género
    ✔ deberían tener una marca
    ✔ deberían tener un id único dentro de su marca
    ✔ deberían tener un precio de mercado
    ✔ deberían de poder ser exclusivos

  User class
    ✔ deberían tener un nombre
    ✔ deberían tener una colección de Funkos
    ✔ debería poder añadir Funkos a su colección
    ✔ deberían ser informados si intentan agregar un Funko que ya está en su colección
    ✔ deberían poder modificar un Funko si su identificación está en su colección
    ✔ deberían ser informados si intentan modificar un Funko que no está en su colección
    ✔ deberían poder eliminar Funkos de su colección
    ✔ deberían ser informado si intentan eliminar un Funko que no está en su colección.
    ✔ deberían poder buscar Funkos en su colección.

  Mochila
    procesar
      ✔ debería leer un archivo CSV correctamente
      ✔ debería leer un archivo JSON correctamente
      ✔ debería lanzar un error si el formato del archivo no es válido


  22 passing (98ms)

------------------------|---------|----------|---------|---------|-----------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s     
------------------------|---------|----------|---------|---------|-----------------------
All files               |   97.71 |    91.89 |      80 |   97.71 |                       
 FunkoAPP/BasicFunkoPop |     100 |      100 |     100 |     100 |                       
  BasicFunkoPop.ts      |     100 |      100 |     100 |     100 |                       
 FunkoAPP/FunkoPop      |     100 |       40 |     100 |     100 |                       
  FunkoPop.ts           |     100 |       40 |     100 |     100 | 86-90                 
 FunkoAPP/Genre         |     100 |      100 |     100 |     100 |                       
  Genre.ts              |     100 |      100 |     100 |     100 |                       
 FunkoAPP/Type          |     100 |      100 |     100 |     100 |                       
  Type.ts               |     100 |      100 |     100 |     100 |                       
 FunkoAPP/User          |   93.07 |      100 |    62.5 |   93.07 |                       
  user.ts               |   93.07 |      100 |    62.5 |   93.07 | 95-96,118-120,126-129 
 PE103/Mochila          |     100 |      100 |     100 |     100 |                       
  Mochila.ts            |     100 |      100 |     100 |     100 |                       
------------------------|---------|----------|---------|---------|-----------------------
```


## Conclusiones

Ejercicio bastante interesante a la par que entretenido de realizar. A medida que avanzamos en la asignatura voy descrubiendo nuevas herramientas muy útiles que desconocía. También desconocía todo el mundillo este de coleccionismo de FunkoPops pero está bastante curioso.

## Elementos Bibliográficos:

- Principios SOLID, https://profile.es/blog/principios-solid-desarrollo-software-calidad/.

- Guión de la Práctica 10, https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-edurguezsb.git .

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