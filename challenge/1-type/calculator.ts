/**
 * Let's make a calculator 🧮
 */

// union 타입을 사용함, 오퍼레이션이 이미 정해져 있기도 하니깐 !
type Operation = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';

function calculate(operation: Operation, number1:number, number2:number): number | undefined {
	if (operation === 'add') {
		return number1 + number2;
	} else if (operation === 'substract') {
		return number1 - number2; 
	} else if (operation === 'multiply') {
		return number1 * number2; 
	} else if (operation === 'divide') {
		return number1 / number2; 
	} else if (operation === 'remainder') {
		return number1 % number2; 
	} 
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 3, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1

/**
 * elie 의 답
 * - switch 문
 * - default 로 Error 오브젝트 throw => 좀 더 안정적인 프로그램
 */

// type Operation = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';

// function calculate(operation: Operation, number1:number, number2:number): number | undefined {
// 	switch (operation) {
// 		case "add" :
// 			return number1 + number2;
// 		case "substract" :
// 			return number1 - number2;
// 		case "multiply" :
// 			return number1 * number2;
// 		case "divide" :
// 			return number1 / number2;
// 		case "remainder" :
// 			return number1 % number2;
// 		default :
// 			throw Error("unknown Operation !!");
// 	}
// }