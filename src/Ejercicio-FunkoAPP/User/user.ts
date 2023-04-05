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