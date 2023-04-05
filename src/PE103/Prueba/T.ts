// import fs from 'fs';

/**
 * Interfaz para representar un elemento de la mochila.
 */
type Elemento = { peso: number; beneficio: number };

/**
 * Clase abstracta que representa un procesador de archivos genérico.
 * @template T - El tipo de los elementos que se van a procesar.
 */
abstract class ProcesadorArchivo<T extends Elemento> {
  protected capacidadMochila = 0;
  protected elementos: T[] = [];

  /**
   * Método que procesa un archivo CSV o JSON y devuelve los beneficios y pesos de los elementos de la mochila.
   * @param ubicacion - La ubicación del archivo a procesar.
   * @returns Un array con los beneficios y pesos de los elementos de la mochila.
   * @throws Un error si el formato del archivo no es válido.
   */
  public procesar(ubicacion: string): [number[], number[]] {
//    const archivo = fs.readFileSync(ubicacion, 'utf-8');
    const extension = ubicacion.split('.').pop();
    switch (extension) {
      case 'csv':
//        this.leerArchivoCSV(archivo);
        break;
      case 'json':
//        this.leerArchivoJSON(archivo);
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

  /**
   * Método abstracto que debe ser implementado por las subclases para leer un archivo CSV.
   * @param archivo - El contenido del archivo CSV.
   */
  protected abstract leerArchivoCSV(archivo: string): void;

  /**
   * Método abstracto que debe ser implementado por las subclases para leer un archivo JSON.
   * @param archivo - El contenido del archivo JSON.
   */
  protected abstract leerArchivoJSON(archivo: string): void;
}

/**
 * Clase que representa el problema de la mochila.
 * @template T - El tipo de los elementos que se van a procesar.
 */
export class Mochila<T extends Elemento> extends ProcesadorArchivo<T> {
  /**
   * Método que lee un archivo CSV y carga los elementos y la capacidad de la mochila.
   * @param archivo - El contenido del archivo CSV.
   */
  protected leerArchivoCSV(archivo: string): void {
    const lineas = archivo.trim().split(/\r?\n/);
    this.capacidadMochila = Number(lineas[0]);
    const numElementos = Number(lineas[1]);
    for (let i = 2; i < numElementos + 2; i++) {
      const [peso, beneficio] = lineas[i].trim().split(/\s+/).map(Number);
      this.elementos.push({ peso, beneficio } as T);
    }
  }

  /**
   * Método que lee un archivo JSON y carga los elementos y la capacidad de la mochila.
   * @param archivo - El contenido del archivo JSON.
   */
  protected leerArchivoJSON(archivo: string): void {
    const { capacidad, numElementos, elementos } = JSON.parse(archivo);
    this.capacidadMochila = capacidad;
    for (const elemento of elementos) {
//      const { peso, beneficio } as T);
    }
  }
}