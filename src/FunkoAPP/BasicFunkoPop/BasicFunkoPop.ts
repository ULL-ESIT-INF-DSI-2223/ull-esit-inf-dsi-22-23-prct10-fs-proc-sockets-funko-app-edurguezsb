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
