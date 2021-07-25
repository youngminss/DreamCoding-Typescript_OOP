/**
 * default 와 아닌 것의 구분 import 사용법
 */
// import add, { printHello, name } from "./7-3-module1.js";
// console.log(add(1, 2));
// printHello();
// console.log(name);

/**
 * * (astro) import 사용법
 */
import * as calculator from "./7-3-module1.js";
calculator.printHello();
console.log(calculator.default(1, 2));
console.log(calculator.name);
