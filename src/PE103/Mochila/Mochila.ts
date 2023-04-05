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
