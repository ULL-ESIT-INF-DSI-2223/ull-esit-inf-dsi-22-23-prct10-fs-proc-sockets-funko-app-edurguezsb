import { Mochila } from '../Mochila/Mochila';

const mochila = new Mochila();

const [beneficios, pesos] = mochila.procesar('./a.csv');
console.log(beneficios); // [20, 10, 25, 8, 35]
console.log(pesos); // [10, 5, 12, 6, 15]

const [beneficios2, pesos2] = mochila.procesar('./a.json');
console.log(beneficios2); // [20, 10, 25]
console.log(pesos2); // [10, 5, 12]
