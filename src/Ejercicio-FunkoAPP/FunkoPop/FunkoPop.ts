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